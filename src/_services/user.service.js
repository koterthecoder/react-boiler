import ApiUrls from '../_helpers/api-urls';
import authHeader from '../_helpers/auth-header';


function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('favorited');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = data.Message;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(email, password) {

    var userModel = {
      Email: email,
      Password: password,
    };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userModel),
  };

  return fetch(ApiUrls.Login, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.Token || user.TwoFactor.Authorization || user.TwoFactor.Verification) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function register(user) {

  var userModel = {
    FirstName: user.first_name,
    LastName: user.last_name,
    Email: user.email,
    Password: user.password,
    ConfirmPassword: user.confirm_password,
    Birthdate: user.birthdate,
    Zip: user.zip,
    IsEmailMarketingSubscribed: user.marketingEnroll,
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userModel),
  };

  return fetch(ApiUrls.Register, requestOptions)
    .then(handleResponse)
    .then((registeredUser) => {
      // console.log(registeredUser);
      if (registeredUser.Token) {
        localStorage.setItem('user', JSON.stringify(registeredUser));
      }
      return registeredUser;
    });
}

function verifyAccountEmail(token) {

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(ApiUrls.VerifyEmail(token), requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.Token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function loginWithFacebook(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.FacebookLogin, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.Token || user.TwoFactor.Authorization || user.TwoFactor.Verification) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function toggleFavorite(data) {

  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.ToggleFavorite, requestOptions)
    .then(handleResponse);
}

function updateUser(data) {

  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.UpdateUser, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.Token || user.TwoFactor.Authorization || user.TwoFactor.Verification) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });

}

function updateUserPassword(data, token) {

  var headers = token ? { Authorization: `Bearer ${token}` } : authHeader();

  const requestOptions = {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.UpdatePassword, requestOptions)
    .then(handleResponse);
}

function submitTwoFactorCode(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.TwoFactorVerification, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.Token || user.TwoFactor.Authorization || user.TwoFactor.Verification) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });

}

function resendTwoFactorCode(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.ReSendCode, requestOptions)
    .then(handleResponse);

}







function verifyEmailForReset(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.VerifyEmailForReset, requestOptions)
    .then(handleResponse);

}

function sendResetMessage(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.SendResetMessage, requestOptions)
    .then(handleResponse);

}

function submitResetCode(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.SubmitResetCode, requestOptions)
    .then(handleResponse);

}

function verifyTokenForReset(data) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.VerifyTokenForReset, requestOptions)
    .then(handleResponse);

}

export default {
  login,
  logout,
  register,
  toggleFavorite,
  verifyAccountEmail,
  loginWithFacebook,
  updateUser,
  submitTwoFactorCode,
  resendTwoFactorCode,
  updateUserPassword,

  verifyEmailForReset,
  sendResetMessage,
  submitResetCode,
  verifyTokenForReset,
};
