import userConstants from '../_constants/user.constants';
import moment from 'moment';

let user = JSON.parse(localStorage.getItem('user'));

// user.Birthdate = user.Birthdate === null ? moment() : user.Birthdate;

const initialState = {
    loading: false,
    userAccount: user,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_USER_REQUEST:
      return { 
          ...state,
          loading: true 
        };
    case userConstants.UPDATE_USER_SUCCESS:
        var newModel = action.updatedUser;
        newModel.MiddleName = newModel.MiddleName === null ? "" : newModel.MiddleName;
        newModel.Birthdate = newModel.Birthdate === null ? "" : newModel.Birthdate;
        newModel.Address = newModel.Address === null ? "" : newModel.Address;
        newModel.City = newModel.City === null ? "" : newModel.City;
        newModel.State = newModel.State === null ? "" : newModel.State;
        newModel.Zip = newModel.Zip === null ? "" : newModel.Zip;
        newModel.MobileNumber = newModel.MobileNumber === null ? "" : newModel.MobileNumber;

        return { 
            ...state,
            userAccount: newModel,
            loading: false,
          };
    case userConstants.UPDATE_USER_FAILURE:
      return { 
          ...state,
          loading: false 
        };
    default:
      return state;
  }
}
