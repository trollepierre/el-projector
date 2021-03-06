const { verifyAccessToken } = require('../../../use_cases/services/token-service')

function extractAccessTokenFromAuthorizationHeader(authorizationHeader) {
  let accessToken
  const parts = authorizationHeader.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') {
    [, accessToken] = parts
  }
  return accessToken
}

module.exports = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const accessToken = extractAccessTokenFromAuthorizationHeader(req.headers.authorization)

    try {
      const { email, userId } = verifyAccessToken(accessToken)
      req.userId = userId
      req.userEmail = email
      next()
    } catch (err) {
      res.status(401).json({
        error: {
          message: 'Failed to authenticate token!',
        },
      })
      next(err)
    }
  } else {
    res.status(401).json({
      error: {
        message: 'No token was provided!',
      },
    })
    next()
  }
}
