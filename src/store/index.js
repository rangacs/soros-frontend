import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

// ===========================|| REDUX - MAIN STORE ||=========================== //

// eslint-disable-next-line
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persister = persistStore(store);
export { store, persister };
