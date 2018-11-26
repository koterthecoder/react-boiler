import userConstants from '../_constants/user.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { 
  loggedIn: user.Token ? true : false, 
  user } 
: {};

export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
      };

    case userConstants.UPDATE_AUTH_USER:
      return {
        loggedIn: false,
        user: action.user,
      };



    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
}
