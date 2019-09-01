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
      resolve();
    });
  },

  isAuthenticated() {
    return canUseDOM ? !!window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
  },

  getAccessToken() {
    return canUseDOM ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
  },

  getAuthenticatedUser() {
    return canUseDOM ? JSON.parse(window.localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY)) : null;
  },

};