import canUseDOM from 'can-use-dom';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
export const AUTHENTICATED_USER_STORAGE_KEY = 'authenticated_user';

function _saveAccessTokenIntoLocalStorage(accessToken) {
  return (canUseDOM) ? window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken) : false;
}

function _saveRefreshTokenIntoLocalStorage(refreshToken) {
  return (canUseDOM) ? window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken) : false;
}

function _removeItemFromLocalStorage(storageKey) {
  return (canUseDOM) ? window.localStorage.removeItem(storageKey) : null;
}

export default {

  authenticate(tokens, data) {
    _removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);

    _saveAccessTokenIntoLocalStorage(tokens.token);
    _saveRefreshTokenIntoLocalStorage(tokens.refreshToken)

    const authenticatedUser = {
      name: data.name,
      email: data.email,
    };
    window.localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
  },

  reauthenticate(tokens) {
    _removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);

    _saveAccessTokenIntoLocalStorage(tokens.token);
    _saveRefreshTokenIntoLocalStorage(tokens.refreshToken)
  },

  getRefreshToken() {
    return (canUseDOM) ? window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) : null;
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
