import adminConstants from '../_constants/admin.constants';



const initialState = {
    loading: false,
    
    homeDetails: {},

    uploadingImages: [],
    failedUploadImages: [],

    users: [],

    selectedUser: initialUser,

    userPages: [],

};


export default function (state = initialState, action) {
  switch (action.type) {


    case adminConstants.GET_HOME_REQUEST:
      return {
            ...state,
            loading: true,
      };
    case adminConstants.GET_HOME_SUCCESS:
      return {
            ...state,
            homeDetails: action.homeDetails,
            loading: false,
      };
    case adminConstants.GET_HOME_FAILURE:
      return {
            ...state,
            loading: false,
      };






    case adminConstants.UPDATE_USER_STATE:
      return {
            ...state,
            selectedUser: action.user,
      };


    case adminConstants.SAVE_USER_REQUEST:
      return {
            ...state,
            loading: true,
      };
    case adminConstants.SAVE_USER_SUCCESS:
      return {
            ...state,
            users: action.users,
            loading: false,
      };
    case adminConstants.SAVE_USER_FAILURE:
      return {
            ...state,
            loading: false,
      };


    case adminConstants.GET_USER_REQUEST:
      return {
            ...state,
            loading: true,
      };
    case adminConstants.GET_USER_SUCCESS:
      return {
            ...state,
            users: action.users,
            userPages: action.pages,
            loading: false,
      };
    case adminConstants.GET_USER_FAILURE:
      return {
            ...state,
            loading: false,
      };


    case adminConstants.DELETE_USER_REQUEST:
      return {
            ...state,
            loading: true,
      };
    case adminConstants.DELETE_USER_SUCCESS:
      return {
            ...state,
            users: state.users.filter(c => c.Id !== action.deleteId),

            loading: false,
      };
    case adminConstants.DELETE_USER_FAILURE:
      return {
            ...state,
            loading: false,
      };












    default:
      return state;
  }
}
