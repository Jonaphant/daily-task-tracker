import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import task from './task';

export default combineReducers({
  alert,
  auth,
  task,
});
