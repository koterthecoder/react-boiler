import { combineReducers } from 'redux';

import authentication from './authentication.reducer';
import registration from './registration.reducer';
import alert from './alert.reducer';
import loading from './loading.reducer';
import account from './account.reducer';
import reset from './reset.reducer';
import admin from './admin.reducer';
import error from './error.reducer';
import header from './header.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  loading,
  account,
  reset,
  admin,
  error,
  header
});

export default rootReducer;
