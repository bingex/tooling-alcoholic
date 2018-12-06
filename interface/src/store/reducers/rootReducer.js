import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toolTypeReducer from './toolTypeReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  authReducer,
  toolTypeReducer,
  commonReducer
});
