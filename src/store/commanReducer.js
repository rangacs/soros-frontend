// action - state management
import { DATE_INTERVAL, REFRESH_INTERVAL, DISABLE_REFRESH_INTERVAL, HISTORICAL_DATA, HISTORICAL_INTERVAL } from './actions';

// ===========================|| ACCOUNT REDUCER ||=========================== //

const endDate = new Date();
const startDate = new Date();
startDate.setHours(startDate.getHours() - 8);

export const INITIAL_STATE = {
    rangeStart: startDate,
    rangeEnd: endDate,
    siteSettings: { o: 9 },
    refreshInterval: 10,
    historicalData: 'no',
    historicalStart: startDate,
    historicalEnd: endDate,
    deactivateRefresh: false
};

const commanReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DATE_INTERVAL: {
            return {
                ...state,
                rangeStart: action.rangeStart,
                rangeEnd: action.rangeEnd,
                siteSettings: action.siteSettings
            };
        }
        case REFRESH_INTERVAL: {
            return {
                ...state,
                refreshInterval: action.refreshInterval
            };
        }
        case HISTORICAL_DATA: {
            return {
                ...state,
                historicalData: action.historicalData,
                historicalStart: action.historicalStart,
                historicalEnd: action.historicalEnd
            };
        }
        case HISTORICAL_INTERVAL: {
            return {
                ...state,
                historicalStart: action.historicalStart,
                historicalEnd: action.historicalEnd,
                historicalData: action.historicalData
            };
        }
        case DISABLE_REFRESH_INTERVAL: {
            return {
                ...state,
                deactivateRefresh: action.deactivateRefresh
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default commanReducer;
