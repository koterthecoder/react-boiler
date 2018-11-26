import userConstants from '../_constants/user.constants';

export default function (state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return { registering: false };
    default:
      return state;
  }
}
