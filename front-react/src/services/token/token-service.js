import canUseDOM from 'can-use-dom'
import { getInLocalStorage, removeInLocalStorage, saveInLocalStorage } from '../window/window-service'

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token'
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token'
export const AUTHENTICATED_USER_STORAGE_KEY = 'authenticated_user'

function _saveAccessTokenIntoLocalStorage(accessToken) {
  return canUseDOM ? saveInLocalStorage(ACCESS_TOKEN_STORAGE_KEY, accessToken) : false
}

function _saveRefreshTokenIntoLocalStorage(refreshToken) {
  return canUseDOM ? saveInLocalStorage(REFRESH_TOKEN_STORAGE_KEY, refreshToken) : false
}

function _removeItemFromLocalStorage(storageKey) {
  return canUseDOM ? removeInLocalStorage(storageKey) : null
}

const saveUserTokens = (tokens, data) => {
  reauthenticate(tokens)

  const authenticatedUser = {
    name: data.name,
    email: data.email,
  }
  if (canUseDOM) {
    saveInLocalStorage(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(authenticatedUser))
  }
}

const reauthenticate = (tokens) => {
  _saveAccessTokenIntoLocalStorage(tokens.token)
  _saveRefreshTokenIntoLocalStorage(tokens.refreshToken)
}

const removeTokens = () => new Promise((resolve) => {
  _removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY)
  _removeItemFromLocalStorage(REFRESH_TOKEN_STORAGE_KEY)
  _removeItemFromLocalStorage(AUTHENTICATED_USER_STORAGE_KEY)
  resolve()
})

const isAuthenticated = () => (canUseDOM ? !!getInLocalStorage(ACCESS_TOKEN_STORAGE_KEY) : null)

const getAccessToken = () => (canUseDOM ? getInLocalStorage(ACCESS_TOKEN_STORAGE_KEY) : null)

const getRefreshToken = () => (canUseDOM ? getInLocalStorage(REFRESH_TOKEN_STORAGE_KEY) : null)

const getAuthenticatedUser = () => (canUseDOM ? JSON.parse(getInLocalStorage(AUTHENTICATED_USER_STORAGE_KEY)) : null)

export default {
  saveUserTokens,
  reauthenticate,
  getRefreshToken,
  removeTokens,
  isAuthenticated,
  getAccessToken,
  getAuthenticatedUser,
}
