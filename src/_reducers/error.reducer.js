import errorConstants from '../_constants/error.constants';


const initialState = { 
  code: 0,
  message: "An Error Has Occurred",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case errorConstants.GET_ERROR_PAGE:
      return {
        ...state,
        code: action.code,
        message: action.message,
      };



    default:
      return state;
  }
}
