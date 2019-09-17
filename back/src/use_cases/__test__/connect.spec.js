const { saveTokens, generateAccessToken, generateRefreshToken } = require('../services/token-service')
const { connect } = require('../connect')
const env = require('../../infrastructure/env/env')

jest.mock('../services/token-service')

describe('connect', () => {
  const user = {
    name: env('PASSWORD'),
  }

  it('should return response with status, token and refresh token', () => {
    // Given
    const token = 'token'
    const refreshToken = 'refresh token'
    generateAccessToken.mockReturnValueOnce(token)
    generateRefreshToken.mockReturnValueOnce(refreshToken)

    // When
    const response = connect({ user })

    // Then
    expect(response).toEqual({
      status: 'Logged in',
      token,
      refreshToken,
    })
  })

  it('should call correctly jwt', () => {
    // When
    connect({ user })

    // Then
    expect(generateAccessToken).toHaveBeenCalledWith(user)
    expect(generateRefreshToken).toHaveBeenLastCalledWith(user)
  })

  it('should add refreshToken in tokensList', () => {
    // Given
    const token = 'token'
    const refreshToken = 'refresh token'
    generateAccessToken.mockReturnValueOnce(token)
    generateRefreshToken.mockReturnValueOnce(refreshToken)

    // When
    connect({ user })

    // Then
    expect(saveTokens).toHaveBeenCalledWith({ token, refreshToken })
  })

  it('should throw error when user name does not match password', () => {
    // Given
    expect.assertions(1)
    user.name = 'invalid password'

    // When
    try {
      connect({ user })
    } catch (err) {
      // Then
      expect(err.message).toEqual('Unauthorized')
    }
  })
})
