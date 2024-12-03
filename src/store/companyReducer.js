// action - state management
import { COMPANY_DATA, ACTIVESTEP, SWITCH_CLIENT, SITE_SETTINGS } from './actions';

// ===========================|| ACCOUNT REDUCER ||=========================== //

const companyReducer = (state = { companyData: [], activeStep: 0, clientId: '', siteSettings: [] }, action) => {
    switch (action.type) {
        case COMPANY_DATA: {
            return {
                ...state,
                companyData: action.payload.companyData
            };
        }
        case ACTIVESTEP: {
            return {
                ...state,
                activeStep: action.payload.activeStep
            };
        }
        case SWITCH_CLIENT: {
            return {
                ...state,
                clientId: action.clientId
            };
        }
        case SITE_SETTINGS: {
            return {
                ...state,
                siteSettings: action.payload.siteSettings
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default companyReducer;
