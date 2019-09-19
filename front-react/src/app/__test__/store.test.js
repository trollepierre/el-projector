import { actionHandlers, actions, initialState } from '../store'
import { apiService, tokenService } from '../../services'

describe('store', () => {
  describe('initialState', () => {
    it('should set isAuthenticated to false', () => {
      // Then
      expect(initialState).toEqual({ isAuthenticated: false })
    })
  })

  describe('actions', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn(() => 'dispatchReturn')
    })

    describe('actions.setIsAuthenticated', () => {
      describe('when user is authenticated', () => {
        let isAuthenticated

        beforeEach(() => {
          isAuthenticated = true
        })

        it('should return dispatch set is authenticated with correct isAuthenticated', () => {
          // When
          const action = actions.setIsAuthenticated(isAuthenticated)(dispatch)

          // Then
          expect(dispatch).toHaveBeenCalledWith({
            type: 'app/SET_IS_AUTHENTICATED', payload: { isAuthenticated },
          })
          expect(action).toEqual('dispatchReturn')
        })

        it('should not call remove token service', () => {
          // Given
          const dispatch = jest.fn(() => 'dispatchReturn')
          tokenService.removeTokens = jest.fn()

          // When
          actions.setIsAuthenticated(isAuthenticated)(dispatch)

          // Then
          expect(tokenService.removeTokens).not.toHaveBeenCalled()
        })
      })

      describe('when user is not authenticated', () => {
        let isAuthenticated

        beforeEach(() => {
          isAuthenticated = false
        })

        it('should return dispatch set is authenticated to false', () => {
          // Given
          const dispatch = jest.fn(() => 'dispatchReturn')

          // When
          const action = actions.setIsAuthenticated(isAuthenticated)(dispatch)

          // Then
          expect(dispatch).toHaveBeenCalledWith({
            type: 'app/SET_IS_AUTHENTICATED', payload: { isAuthenticated },
          })
          expect(action).toEqual('dispatchReturn')
        })

        it('should call remove token service', () => {
          // Given
          const dispatch = jest.fn(() => 'dispatchReturn')
          tokenService.removeTokens = jest.fn()

          // When
          actions.setIsAuthenticated(isAuthenticated)(dispatch)

          // Then
          expect(tokenService.removeTokens).toHaveBeenCalledWith()
        })
      })
    })

    describe('actions.authenticate', () => {
      const password = 'password'

      describe('success case', () => {

        beforeEach(() => {
          apiService.post = jest.fn(() => 'tokens')
          tokenService.saveUserTokens = jest.fn()
        })

        it('should call api to post login with data', () => {
          // When
          actions.authenticate(password)(dispatch)

          // Then
          expect(apiService.post).toHaveBeenCalledWith('login', {
            email: 'some@example.org',
            name: password,
          })
        })

        it('should save user tokens', async () => {
          // When
          await actions.authenticate(password)(dispatch)

          // Then
          expect(tokenService.saveUserTokens).toHaveBeenCalledWith('tokens', {
            email: 'some@example.org',
            name: password,
          })
        })

        it('should dispatch set is authenticated to true', async () => {
          // When
          await actions.authenticate(password)(dispatch)

          // Then
          expect(dispatch).toHaveBeenCalledWith({
            type: 'app/SET_IS_AUTHENTICATED',
            payload: { isAuthenticated: true },
          })
        })
      })

      describe('failure case', () => {
        beforeEach(() => {
          apiService.post = jest.fn()
          apiService.post.mockRejectedValue('error')
          window.alert = jest.fn()
        })

        it('should dispatch set is authenticated to false', async () => {
          // When
          await actions.authenticate(password)(dispatch)

          // Then
          expect(dispatch).toHaveBeenCalledWith({
            type: 'app/SET_IS_AUTHENTICATED',
            payload: { isAuthenticated: false },
          })
        })

        it('should alert', async () => {
          // When
          await actions.authenticate(password)(dispatch)

          // Then
          expect(window.alert).toHaveBeenCalledWith('wrong password')
        })
      })
    })

    describe('actions.loginSilently', () => {
      const refreshToken = 'refreshToken'

      describe('success case', () => {
        beforeEach(() => {
          apiService.post = jest.fn(() => 'tokens')
          tokenService.reauthenticate = jest.fn()
          tokenService.getRefreshToken = jest.fn()
        })

        it('should not call api service post', () => {
          // When
          actions.loginSilently()(dispatch)

          // Then
          expect(apiService.post).not.toHaveBeenCalled()
        })

        it('should call api to post login with refreshToken', () => {
          // Given
          tokenService.getRefreshToken.mockReturnValue(refreshToken)

          // When
          actions.loginSilently()(dispatch)

          // Then
          expect(apiService.post).toHaveBeenCalledWith('login/token', { refreshToken })
        })

        it('should reauthenticate with refresh token', async () => {
          // Given
          tokenService.getRefreshToken.mockReturnValue(refreshToken)

          // When
          await actions.loginSilently()(dispatch)

          // Then
          expect(tokenService.reauthenticate).toHaveBeenCalledWith('tokens')
        })

        it('should dispatch set is authenticated to true', async () => {
          // Given
          tokenService.getRefreshToken.mockReturnValue(refreshToken)

          // When
          await actions.loginSilently()(dispatch)

          // Then
          expect(dispatch).toHaveBeenCalledWith({
            type: 'app/SET_IS_AUTHENTICATED',
            payload: { isAuthenticated: true },
          })
        })
      })

      describe('failure case', () => {
        beforeEach(() => {
          apiService.post = jest.fn().mockRejectedValue('error')
          window.alert = jest.fn()
          tokenService.getRefreshToken = jest.fn().mockReturnValue(refreshToken)
        })

        it('should dispatch set is authenticated to false', async () => {
          expect.assertions(1)
          // When
          try {
            await actions.loginSilently()(dispatch)
          } catch (error) {
            // Then
            expect(dispatch).toHaveBeenCalledWith({
              type: 'app/SET_IS_AUTHENTICATED',
              payload: { isAuthenticated: false },
            })
          }
        })

        it('should remove token', async () => {
          // Given
          expect.assertions(1)
          tokenService.removeTokens = jest.fn()

          // When
          try {
            await actions.loginSilently()(dispatch)
          } catch (error) {
            // Then
            expect(tokenService.removeTokens).toHaveBeenCalledWith()
          }
        })

        it('should alert', async () => {
          expect.assertions(1)
          // When
          try {
            await actions.loginSilently()(dispatch)
          } catch (error) {

            // Then
            expect(window.alert).toHaveBeenCalledWith('problem during login silently')
          }
        })

        it('should throw error', async () => {
          expect.assertions(1)
          // When
          try {
            await actions.loginSilently()(dispatch)
          } catch (error) {
            // Then
            expect(error).toEqual('error')
          }
        })
      })
    })
  })

  describe('actionHandlers', () => {
    it('should set is authenticated in state when app/SET_IS_AUTHENTICATED is called', () => {
      // Given
      const state = { foo: 'bar' }
      const action = { payload: { isAuthenticated: false } }

      // When
      const newState = actionHandlers['app/SET_IS_AUTHENTICATED'](
        state,
        action
      )

      // Then
      expect(newState).toEqual({
        foo: 'bar',
        isAuthenticated: false,
      })
    })
  })
})
