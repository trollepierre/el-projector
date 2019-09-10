const jwt = require('jsonwebtoken')
const { connect } = require('../connect')

describe('connect', () => {
  const user = {
    name: process.env.PASSWORD,
  }
  beforeEach(() => {
    jwt.sign = jest.fn()
  })

  it('should return response with status, token and refresh token', () => {
    // Given
    const token = 'token'
    const refreshToken = 'refresh token'
    jwt.sign.mockReturnValueOnce(token)
    jwt.sign.mockReturnValueOnce(refreshToken)

    // When
    const response = connect( user )

    // Then
    expect(response).toEqual({
      status: 'Logged in',
      token,
      refreshToken,
    })
  })

  it('should call correctly jwt', () => {
    // Given
    jwt.sign = jest.fn()

    // When
    connect(user)

    // Then
    expect(jwt.sign).toHaveBeenCalledWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 })
    expect(jwt.sign).toHaveBeenLastCalledWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 })
  })

  it('should throw error when user name does not match password', () => {
    // Given
    expect.assertions(1)
    user.name = 'invalid password'

    // When
    try {
      connect(user)
    } catch(err) {
      // Then
      expect(err.message).toEqual('Unauthorized')
    }
  })
})
