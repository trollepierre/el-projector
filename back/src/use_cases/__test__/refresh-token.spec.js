const jwt = require('jsonwebtoken')
const { refreshToken } = require('../refresh-token')

describe('refreshToken', () => {
  const user = {
    name: process.env.PASSWORD,
  }
  let tokenList = []
  beforeEach(() => {
    jwt.sign = jest.fn()
    tokenList = {}
  })

  it('should return response with status, token and refresh token', () => {
    // Given
    const token = 'token'
    jwt.sign.mockReturnValueOnce(token)
    const realRefreshToken = 'refreshToken'
    tokenList[realRefreshToken] = 'old token'

    // When
    const response = refreshToken({ refreshToken: realRefreshToken, user, tokenList })

    // Then
    expect(response).toEqual({
      status: 'Logged in',
      token,
      refreshToken: 'refreshToken',
    })
  })

  it('should call correctly jwt', () => {
    // Given
    jwt.sign = jest.fn()

    // When
    refreshToken({ user, tokenList })

    // Then
    expect(jwt.sign).toHaveBeenCalledWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 })
    expect(jwt.sign).toHaveBeenLastCalledWith(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 })
  })

  it('should add refreshToken in tokensList', () => {
    // Given
    const token = 'token'
    const refreshToken = 'refresh token'
    jwt.sign.mockReturnValueOnce(token)
    jwt.sign.mockReturnValueOnce(refreshToken)

    // When
    refreshToken({ user, tokenList })

    // Then
    expect(tokenList).toEqual([refreshToken])
  })

  it('should throw error when user name does not match password', () => {
    // Given
    expect.assertions(1)
    user.name = 'invalid password'

    // When
    try {
      refreshToken({ user, tokenList })
    } catch (err) {
      // Then
      expect(err.message).toEqual('Unauthorized')
    }
  })
})
