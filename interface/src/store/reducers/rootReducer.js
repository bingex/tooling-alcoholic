import { combineReducers } from 'redux';
import authReducer from './authReducer';
import toolTypeReducer from './toolTypeReducer';
import commonReducer from './commonReducer';
import companyReducer from './companyReducer';
import toolReducer from './toolReducer';

export default combineReducers({
  authReducer,
  toolTypeReducer,
  commonReducer,
  companyReducer,
  toolReducer
});
