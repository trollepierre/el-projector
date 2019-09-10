const { auth } = require('./index')
const jwt = require('jsonwebtoken')

describe('auth', () => {
  const req = {}
  const jsonMock = jest.fn()
  const res = { status: jest.fn(() => ({ json: jsonMock })) }
  const next = jest.fn()

  it('should return error when headers not set', () => {
    // When
    auth(req, res, next)

    // Then
    expect(res.status).toHaveBeenCalledWith(401)
    expect(jsonMock).toHaveBeenCalledWith({
      error: {
        msg: 'No token was provided!',
      },
    })
  })

  it('should return error when headers authorization not set', () => {
    // Given
    req.headers = {}

    // When
    auth(req, res, next)

    // Then
    expect(res.status).toHaveBeenCalledWith(401)
    expect(jsonMock).toHaveBeenCalledWith({
      error: {
        msg: 'No token was provided!',
      },
    })
  })

  it('should return error when headers jwt verify crashes', () => {
    // Given
    req.headers = { authorization: 'Bearer token' }

    // When
    auth(req, res, next)

    // Then
    expect(res.status).toHaveBeenCalledWith(401)
    expect(jsonMock).toHaveBeenCalledWith({
      error: {
        msg: 'Failed to authenticate token!',
      },
    })
  })

  it('should verify jwt with correct access token', () => {
    // Given
    const email = 'email@example.org'
    const userId = 'userId'
    req.headers = { authorization: 'Bearer token' }
    jwt.verify = jest.fn(() => ({ email, userId }))

    // When
    auth(req, res, next)

    // Then
    expect(jwt.verify).toHaveBeenCalledWith('token', undefined)
  })

  it('should update req value', () => {
    // Given
    const email = 'email@example.org'
    const userId = 'userId'
    const headers = { authorization: 'Bearer token' }
    req.headers = headers
    jwt.verify = jest.fn(() => ({ email, userId }))

    // When
    auth(req, res, next)

    // Then
    expect(req).toEqual({ userId, userEmail: email, headers })
  })

  it('should call next', () => {
    // Given
    const email = 'email@example.org'
    const userId = 'userId'
    req.headers = { authorization: 'Bearer token' }
    jwt.verify = jest.fn(() => ({ email, userId }))

    // When
    auth(req, res, next)

    // Then
    expect(next).toHaveBeenCalledWith()
  })
})
