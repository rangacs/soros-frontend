import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';

import * as actions from 'store/actions';
// auth provider
import { JWTProvider } from 'contexts/JWTContext';
// import {Auth0Provider} from 'contexts/Auth0Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ===========================|| APP ||=========================== //

const App = () => {
    const dispatch = useDispatch();
    const customization = useSelector((state) => ({
        isOpen: ['default'],
        fontFamily: "'Inter', sans-serif",
        borderRadius: 0,
        outlinedFilled: false,
        navType: 'light',
        presetColor: 'theme6',
        locale: 'en',
        rtlLayout: false,
        opened: true
    }));
    useEffect(() => {
        dispatch({ type: actions.SET_BORDER_RADIUS, borderRadius: 4 });
    }, []);
    return (
        <StyledEngineProvider injectFirst>
            <ToastContainer />

            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <JWTProvider>
                    <NavigationScroll>
                        <Routes />
                        <Snackbar />
                    </NavigationScroll>
                </JWTProvider>

                {/* </RTLLayout> */}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
