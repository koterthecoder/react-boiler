import userConstants from '../_constants/user.constants';
import userService from '../_services/user.service';
import alertActions from './alert.actions';
import loadingActions from './loading.actions';
import history from '../_helpers/history';
import resetConstants from '../_constants/reset.constants';
  import headerActions from './header.actions';


function logout() {
  function success() { return { type: userConstants.LOGOUT }; }

  return (dispatch) => {
    userService.logout();
    dispatch(success());
    dispatch(alertActions.success('Logged out successfully'));
  };
}




function login(username, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function updateAuthUser(user) { return { type: userConstants.UPDATE_AUTH_USER, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ username }));
    dispatch(loadingActions.startLoading());
    userService.login(username, password)
      .then(
        (user) => {
          dispatch(loadingActions.stopLoading());
            if (user.TwoFactor != null && user.TwoFactor.Authorization) {
                dispatch(updateAuthUser(user));
                history.push("/twofactor");
                dispatch(headerActions.goToPage("twofactor"));

            }
            else {
                dispatch(success(user));
                localStorage.setItem('favorited', JSON.stringify(user.Favorites));

                history.push('/');
                dispatch(headerActions.goToPage(""));
                dispatch(alertActions.success('Login successful'));
            }
        },
        (error) => {
          dispatch(loadingActions.stopLoading());
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function register(user) {
  function request() {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success() {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function authorize(registeredUser) {
    return { type: userConstants.LOGIN_SUCCESS, user: registeredUser };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(user));
    dispatch(loadingActions.startLoading());
    userService.register(user)
      .then(
        (registeredUser) => {
          dispatch(loadingActions.stopLoading());
          dispatch(success(registeredUser));
          dispatch(authorize(registeredUser));
          localStorage.setItem('favorited', JSON.stringify(registeredUser.Favorites));
          history.push('/');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(loadingActions.stopLoading());
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}


function verifyUserEmail(token) {
  function request() { return { type: userConstants.LOGIN_REQUEST }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());
    dispatch(loadingActions.startLoading());

    userService.verifyAccountEmail(token)
      .then(
        (user) => {
          dispatch(loadingActions.stopLoading());
          dispatch(success(user));
          history.push('/');

          dispatch(alertActions.success('Verification successful'));
        },
        (error) => {
          dispatch(loadingActions.stopLoading());
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}


function loginWithFacebook(authorization) {
    function request() { return { type: userConstants.LOGIN_REQUEST }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function updateAuthUser(user) { return { type: userConstants.UPDATE_AUTH_USER, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

    return (dispatch) => {

      dispatch(loadingActions.startLoading());

      console.log(authorization);

      var data = {
        Status: authorization.status,
        AccessToken: authorization.accessToken,
        ExpiresIn: authorization.expiresIn,
        RequthorizeRequiredIn: authorization.reauthorize_required_in,
        SignedRequest: authorization.signedRequest,
        UserId: authorization.userID,
        Name: authorization.name,
        Email: authorization.email,
        Picture: authorization.picture.data.url,
      };
      
      console.log(data);

      userService.loginWithFacebook(data)
        .then(
          (user) => {
            dispatch(loadingActions.stopLoading());

            if (user.TwoFactor != null && user.TwoFactor.Authorization) {
                dispatch(updateAuthUser(user));
                history.push("/twofactor");
                dispatch(headerActions.goToPage("twofactor"));
            }
            else {
                dispatch(success(user));

                localStorage.setItem('favorited', JSON.stringify(user.Favorites));

                history.push('/');

                dispatch(alertActions.success('Login successful'));
            }
          },
          (error) => {
            dispatch(loadingActions.stopLoading());
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          },
        );
    };
}



function updateUser(user) {
  function request() {
    return { type: userConstants.UPDATE_USER_REQUEST };
  }
  function success(updatedUser) {
    return { type: userConstants.UPDATE_USER_SUCCESS, updatedUser };
  }
  function updateAuthentication(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }

  function failure(error) {
    return { type: userConstants.UPDATE_USER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    dispatch(loadingActions.startLoading());

    userService.updateUser(user)
      .then(
        (updatedUser) => {
            dispatch(success(updatedUser));
            dispatch(loadingActions.stopLoading());
            dispatch(updateAuthentication(updatedUser));
            if (updatedUser.TwoFactor.Verification) {
              history.push("/twofactor");
              dispatch(headerActions.goToPage("twofactor"));
            }
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function updateUserAccountState(user) {
    function success(updatedUser) {
      return { type: userConstants.UPDATE_USER_SUCCESS, updatedUser };
    }

    return (dispatch) => {
        dispatch(success(user));
    };
}

function submitTwoFactor(user) {
  function request() { return { type: userConstants.LOGIN_REQUEST }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function updateAccount(updatedUser) {
      return { type: userConstants.UPDATE_USER_SUCCESS, updatedUser };
    }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }


  return (dispatch) => {
    dispatch(request());
    dispatch(loadingActions.startLoading());

    userService.submitTwoFactorCode(user)
      .then(
        (updatedUser) => {
            dispatch(success(updatedUser));
            dispatch(updateAccount(updatedUser));
            dispatch(loadingActions.stopLoading());
            localStorage.setItem('favorited', JSON.stringify(updatedUser.Favorites));


            if (user.TwoFactor.Verification) {
              dispatch(alertActions.success("Mobile number verified"))
            }
            else {
              dispatch(alertActions.success("Two-factor authenticated"))
            }
            history.push("/")

        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error("Unable to verify code"));
          dispatch(loadingActions.stopLoading());

        },
      );
  };
}

function resendTwoFactor(user) {

    function updateAuthUser(user) { return { type: userConstants.UPDATE_AUTH_USER, user }; }

    return (dispatch) => {
      dispatch(loadingActions.startLoading());

      userService.resendTwoFactorCode(user)
        .then(
          (updatedUser) => {
              dispatch(loadingActions.stopLoading());
              dispatch(updateAuthUser(updatedUser));
              dispatch(alertActions.success("Code resent"));
          },
          (error) => {
            dispatch(alertActions.failure("An error occurred"));
          },
        );
    };
}

function updatePassword(user, token) {

    return (dispatch) => {
      dispatch(loadingActions.startLoading());

      userService.updateUserPassword(user, token)
        .then(
          (updatedUser) => {
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.success("Password updated"));
              if (token) {
                  history.push("/login");
                  dispatch(headerActions.goToPage("login"));
              }
          },
          (error) => {
            dispatch(alertActions.failure("An error occurred"));
          },
        );
    };
}

function goToResetPasswordPage() {
  return (dispatch) => {
      history.push("/reset");
      dispatch(headerActions.goToPage("reset"));
  };
}




function verifyEmailForReset(email) {

    function request() { return { type: resetConstants.VERIFY_EMAIL_REQUEST }; }
    function success(mobileVerified, userId) { return { type: resetConstants.VERIFY_EMAIL_SUCCESS, mobileVerified, userId }; }
    function failure(error) { return { type: resetConstants.VERIFY_EMAIL_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request());
        dispatch(loadingActions.startLoading());
        var data = {
          Email: email,
        };

        userService.verifyEmailForReset(data)
          .then(
            (verifiedEmail) => {
                dispatch(loadingActions.stopLoading());
                // console.log(verifiedEmail);
                dispatch(success(verifiedEmail.IsMobileNumberVerified, verifiedEmail.UserId));
            },
            (error) => {
              dispatch(failure(error));
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.failure("An error occurred"));
            },
        );

    };
}

function sendResetCode(userId) {

    function request() { return { type: resetConstants.SEND_CODE_REQUEST }; }
    function success(token) { return { type: resetConstants.SEND_CODE_SUCCESS, token }; }
    function failure(error) { return { type: resetConstants.SEND_CODE_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request());
        dispatch(loadingActions.startLoading());

        var data = {
          UserId: userId,
          SendSms: true,
        };

        userService.sendResetMessage(data)
          .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                // console.log(response);
                dispatch(success(response.Token));
            },
            (error) => {
              dispatch(failure(error));
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.failure("An error occurred"));
            },
        );
    };
}

function sendResetEmail(userId) {

    function request() { return { type: resetConstants.SEND_EMAIL_REQUEST }; }
    function success() { return { type: resetConstants.SEND_EMAIL_SUCCESS }; }
    function failure(error) { return { type: resetConstants.SEND_EMAIL_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request());
        dispatch(loadingActions.startLoading());

        var data = {
          UserId: userId,
          SendSms: false,
        };

        userService.sendResetMessage(data)
          .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                dispatch(success());
                dispatch(alertActions.success("Reset password email sent to user"));
            },
            (error) => {
              dispatch(failure(error));
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.failure("An error occurred"));
            },
        );
    };
}

function submitResetCode(userId, code, token) {

    function request() { return { type: resetConstants.SUBMIT_CODE_REQUEST }; }
    function success(newToken) { return { type: resetConstants.SUBMIT_CODE_SUCCESS, newToken }; }
    function failure(error) { return { type: resetConstants.SUBMIT_CODE_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request());
        dispatch(loadingActions.startLoading());

        var data = {
          UserId: userId,
          Code: code,
          Token: token,
        };

        userService.submitResetCode(data)
          .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                // console.log(response);
                dispatch(success(response.Token));
            },
            (error) => {
              dispatch(failure(error));
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.failure("An error occurred"));
            },
        );
    };

}

function verifyTokenForReset(token) {

    function request() { return { type: resetConstants.VERIFY_TOKEN_REQUEST }; }
    function success(userId, token) { return { type: resetConstants.VERIFY_TOKEN_SUCCESS, userId, token }; }
    function failure(error) { return { type: resetConstants.VERIFY_TOKEN_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request());
        dispatch(loadingActions.startLoading());
        var data = {
          Token: token,
        };

        userService.verifyTokenForReset(data)
          .then(
            (response) => {
                dispatch(loadingActions.stopLoading());
                // console.log(response);
                dispatch(success(response.UserId));
            },
            (error) => {
              dispatch(failure(error));
              dispatch(loadingActions.stopLoading());
              dispatch(alertActions.failure("An error occurred"));
            },
        );

    };
}



export default {
  login,
  logout,
  register,
  verifyUserEmail,
  toggleFavorite,
  loginWithFacebook,
  updateUser,
  updateUserAccountState,
  submitTwoFactor,
  resendTwoFactor,
  updatePassword,
  goToResetPasswordPage,
  verifyEmailForReset,
  sendResetCode,
  sendResetEmail,
  submitResetCode,
  verifyTokenForReset,

};
