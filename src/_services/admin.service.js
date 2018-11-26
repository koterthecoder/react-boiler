import ApiUrls from '../_helpers/api-urls';
import authHeader from '../_helpers/auth-header';
import userService from '../_services/user.service';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        userService.logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


function getHomeInfo(user) {

  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch(ApiUrls.AdminHome, requestOptions).then(handleResponse);
}




function saveUser(user) {

  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(ApiUrls.AdminUser, requestOptions).then(handleResponse);
}
function getUsers(startIndex) {

  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch(ApiUrls.AdminUserParam(startIndex), requestOptions).then(handleResponse);
}

function deleteUser(id) {

  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };

  return fetch(ApiUrls.AdminUserParam(id), requestOptions).then(handleResponse);
}

function searchUsers(data) {

  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };

  return fetch(ApiUrls.AdminUserSearch, requestOptions).then(handleResponse);
}






export default {

  flagEntity,


  getHomeInfo,



  saveUser,  
  getUsers,
  deleteUser,
  searchUsers,


};
