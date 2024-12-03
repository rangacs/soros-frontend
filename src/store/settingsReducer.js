// action - state management
import { SITE_SETTINGS } from './actions';

// ===========================|| ACCOUNT REDUCER ||=========================== //

const settingsReducer = (state = { settings: {} }, action) => {
    switch (action.type) {
        case SITE_SETTINGS: {
            return {
                ...state,
                settings: action.settings
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default settingsReducer;
