import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import loggedReducer from './loggedReducer';
import companyReducer from './companyReducer';
import commanReducer from './commanReducer';
import settingsReducer from './settingsReducer';

// ===========================|| COMBINE REDUCER ||=========================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    companyReducer,
    commanReducer,
    settingsReducer,
    logged: persistReducer(
        {
            key: 'logged',
            storage,
            keyPrefix: 'user-'
        },
        loggedReducer
    )
});

export default reducer;
