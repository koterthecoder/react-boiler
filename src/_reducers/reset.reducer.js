import resetConstants from '../_constants/reset.constants';

const initialState = {
    currentPage: 0,
    Token: "",
    UserId: "",
    IsMobileNumberVerified: false,
};


export default function (state = initialState, action) {
  switch (action.type) {

    case resetConstants.VERIFY_EMAIL_REQUEST:
      return {
          ...state
      };
    case resetConstants.VERIFY_EMAIL_SUCCESS:
      return {
          ...state,
          IsMobileNumberVerified: action.mobileVerified,
          UserId: action.userId,
          currentPage: 1,
      };
    case resetConstants.VERIFY_EMAIL_FAILURE:
      return {
          ...state
      };


    case resetConstants.SEND_CODE_REQUEST:
      return {
          ...state
      };
    case resetConstants.SEND_CODE_SUCCESS:
      return {
          ...state,
          currentPage: 2,
          Token: action.token,
      };
    case resetConstants.SEND_CODE_FAILURE:
      return {
          ...state
      };


    case resetConstants.SEND_EMAIL_REQUEST:
      return {
          ...state
      };
    case resetConstants.SEND_EMAIL_SUCCESS:
      return {
          ...state,
          currentPage: 3,
      };
    case resetConstants.SEND_EMAIL_FAILURE:
      return {
          ...state
      };


    case resetConstants.SUBMIT_CODE_REQUEST:
      return {
          ...state
      };
    case resetConstants.SUBMIT_CODE_SUCCESS:
      return {
          ...state,
          currentPage: 4,
          Token: action.newToken,
      };
    case resetConstants.SUBMIT_CODE_FAILURE:
      return {
          ...state
      };



    case resetConstants.VERIFY_TOKEN_REQUEST:
      return {
          ...state
      };
    case resetConstants.VERIFY_TOKEN_SUCCESS:
      return {
          ...state,
          currentPage: 4,
          UserId: action.userId,
          Token: action.token,
      };
    case resetConstants.VERIFY_TOKEN_FAILURE:
      return {
          ...state
      };




    default:
      return state;
  }
}
