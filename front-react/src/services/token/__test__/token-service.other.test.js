import { tokenService } from '../../index'
import { getInLocalStorage, removeInLocalStorage, saveInLocalStorage } from '../../window/window-service'

jest.mock('can-use-dom', () => false)
jest.mock('../../window/window-service')

describe('token-service', () => {
  const token = 'token'
  const refreshToken = 'refreshToken'
  const tokens = { token, refreshToken }
  const name = 'name'
  const email = 'email'
  const data = { name, email }

  describe('saveUserTokens', () => {
    it('should not store', () => {
      // When
      tokenService.saveUserTokens(tokens, data)

      // Then
      expect(saveInLocalStorage).not.toHaveBeenCalled()
    })
  })

  describe('reauthenticate', () => {
    it('should not store', () => {
      // When
      tokenService.reauthenticate(tokens)

      // Then
      expect(saveInLocalStorage).not.toHaveBeenCalled()
    })
  })

  describe('removeToken', () => {
    it('should not remove items', () => {
      // When
      tokenService.removeTokens()

      // Then
      expect(removeInLocalStorage).not.toHaveBeenCalled()
    })
  })

  describe('getRefreshToken', () => {
    it('should not get in local storage', () => {
      // When
      tokenService.getRefreshToken()

      // Then
      expect(getInLocalStorage).not.toHaveBeenCalled()
    })

    it('should return null', () => {
      // When
      const refreshTokenFromLocalStorage = tokenService.getRefreshToken()

      // Then
      expect(refreshTokenFromLocalStorage).toEqual(null)
    })
  })

  describe('getAccessToken', () => {
    it('should not get in local storage', () => {
      // When
      tokenService.getAccessToken()

      // Then
      expect(getInLocalStorage).not.toHaveBeenCalled()
    })

    it('should return null', () => {
      // When
      const accessTokenFromLocalStorage = tokenService.getAccessToken()

      // Then
      expect(accessTokenFromLocalStorage).toEqual(null)
    })
  })

  describe('isAuthenticated', () => {
    it('should not get in local storage', () => {
      // When
      tokenService.isAuthenticated()

      // Then
      expect(getInLocalStorage).not.toHaveBeenCalled()
    })

    it('should return null', () => {
      // When
      const accessTokenFromLocalStorage = tokenService.isAuthenticated()

      // Then
      expect(accessTokenFromLocalStorage).toEqual(null)
    })
  })

  describe('getAuthenticatedUser', () => {
    it('should get in local storage user', () => {
      // When
      tokenService.getAuthenticatedUser()

      // Then
      expect(getInLocalStorage).not.toHaveBeenCalled()
    })

    it('should return user from local storage', () => {
      // When
      const accessTokenFromLocalStorage = tokenService.getAuthenticatedUser()

      // Then
      expect(accessTokenFromLocalStorage).toEqual(null)
    })
  })
})
