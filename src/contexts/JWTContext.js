import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, LOGGED_USER, SITE_SETTINGS, COMPANY_DATA } from 'store/actions';
import accountReducer from 'store/accountReducer';

import * as actions from 'store/actions';

// project imports
import axios from 'utils/axios';
import Loader from 'ui-component/Loader';
import axiosBaseUrl from 'baseUrl/axiosBaseUrl';
import { settingsServices } from '_services';

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('tokenData', JSON.stringify(serviceToken));
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken.tokens.access.token}`;
    } else {
        localStorage.removeItem('tokenData');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ===========================|| JWT CONTEXT & PROVIDER ||=========================== //

const JWTContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => {}
});

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const login = async (email, password) => {
        const response = await axiosBaseUrl.post('/auth/login', { email, password });
        // const { data } = await axiosBaseUrl.post('/auth/login', { email: values.email, password: values.password });
        const { tokens, user } = response.data;
        setSession(response.data);

        settingsServices
            .getAll()
            .then(({ data: settings }) => {
                dispatch({ type: COMPANY_DATA, payload: { companyData: settings } });
                dispatch({ type: SITE_SETTINGS, payload: { siteSettings: settings } });
                dispatch({ type: actions.SET_BORDER_RADIUS, borderRadius: 10 });
                // dispatch({ type: LOGGED_USER, payload: { loggedUser: user } });
            })
            .catch((err) => {
                console.log('Un able to load settings');
            });
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get('/api/account/me');
                    const { user } = response.data;
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            isLoggedIn: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                        isLoggedIn: false,
                        user: null
                    }
                });
            }
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default JWTContext;
