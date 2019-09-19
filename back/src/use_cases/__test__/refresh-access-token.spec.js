const { saveTokens, generateAccessToken, isValidRefreshToken } = require('../services/token-service')
const { refreshAccessToken } = require('../refresh-access-token')

jest.mock('../services/token-service')

describe('refreshAccessToken', () => {
  const user = {}

  it('should return response with status, token and refresh token', () => {
    // Given
    const token = 'token'
    generateAccessToken.mockReturnValue(token)
    const refreshToken = 'refreshToken'
    isValidRefreshToken.mockReturnValue(true)

    // When
    const response = refreshAccessToken({ refreshToken, user })

    // Then
    expect(response).toEqual({
      status: 're-Logged in',
      token,
      refreshToken: 'refreshToken',
    })
  })

  it('should generate refresh access token', () => {
    // Given
    isValidRefreshToken.mockReturnValue(true)
    const refreshToken = 'refreshToken'

    // When
    refreshAccessToken({ user, refreshToken })

    // Then
    expect(generateAccessToken).toHaveBeenCalledWith(user)
  })

  it('should add refreshToken in tokensList', () => {
    // Given
    const token = 'token'
    const refreshToken = 'refresh token'
    generateAccessToken.mockReturnValueOnce(token)
    isValidRefreshToken.mockReturnValue(true)

    // When
    refreshAccessToken({ user, refreshToken })

    // Then
    expect(saveTokens).toHaveBeenCalledWith({ token, refreshToken })
  })

  it('should throw error when refresh token is not valid', () => {
    // Given
    expect.assertions(1)
    isValidRefreshToken.mockReturnValue(false)

    // When
    try {
      refreshAccessToken({ user })
    } catch (err) {
      // Then
      expect(err.message).toEqual('Reconnection needed')
    }
  })
})
