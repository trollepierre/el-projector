import canUseDOM from 'can-use-dom';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const AUTHENTICATED_USER_STORAGE_KEY = 'authenticated_user';

function _saveAccessTokenIntoLocalStorage(accessToken) {
  return (canUseDOM) ? window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken) : false;
}

function _removeItemFromLocalStorage(storageKey) {
  return (canUseDOM) ? window.localStorage.removeItem(storageKey) : null;
}

export default {

  authenticate(tokens, data) {
    _removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);

    const accessToken = tokens.token;
    _saveAccessTokenIntoLocalStorage(accessToken);

    const authenticatedUser = {
      name: data.name,
      email: data.email,
    };
    window.localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
  },

  disconnect() {
    return new Promise((resolve) => {
      _removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);
      _removeItemFromLocalStorage(AUTHENTICATED_USER_STORAGE_KEY);

      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  isAuthenticated() {
    console.log('inside isAuth');
    console.log(window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
    console.log(canUseDOM);

    let newVar = (canUseDOM) ? !!window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
    console.log({ newVar});

    return newVar;
  },

  getAccessToken() {
    return (canUseDOM) ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
  },

  getAuthenticatedUser() {
    return (canUseDOM) ? JSON.parse(window.localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY)) : null;
  },

};
