const jwt = require('jsonwebtoken')

const { auth } = require('../index')

describe('auth', () => {
  let req
  let jsonMock
  let res
  let next

  beforeEach(() => {
    req = {}
    jsonMock = jest.fn()
    res = { status: jest.fn(() => ({ json: jsonMock })) }
    next = jest.fn()
  })

  it('should return error when headers not set', () => {
    // When
    auth(req, res, next)

    // Then
    expect(res.status).toHaveBeenCalledWith(401)
    expect(jsonMock).toHaveBeenCalledWith({
      error: {
        message: 'No token was provided!',
      },
    })
    expect(next).toHaveBeenCalled()
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
        message: 'No token was provided!',
      },
    })
    expect(next).toHaveBeenCalled()
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
        message: 'Failed to authenticate token!',
      },
    })
    expect(next).toHaveBeenCalled()
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
    expect(jwt.verify).toHaveBeenCalledWith('token', 'jetondaccessecret')
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
