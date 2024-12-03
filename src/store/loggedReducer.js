// action - state management
import { LOGGED_USER } from './actions';

// ===========================|| ACCOUNT REDUCER ||=========================== //

const loggedUser = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGGED_USER: {
            return {
                ...state,
                user: action.payload.loggedUser
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default loggedUser;
