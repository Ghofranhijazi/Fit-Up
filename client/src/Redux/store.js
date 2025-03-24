import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export { store };