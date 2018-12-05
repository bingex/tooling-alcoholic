import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toolTypeReducer from './toolTypeReducer';

export default combineReducers({
  authReducer,
  toolTypeReducer
});
