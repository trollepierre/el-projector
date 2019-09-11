const jwt = require('jsonwebtoken')

const config = {
  'secret': process.env.ACCESS_TOKEN_SECRET,
  'refreshTokenSecret': process.env.REFRESH_TOKEN_SECRET,
  'tokenLife': 900,
  'refreshTokenLife': 86400,
}

const tokenList = {}

const saveTokens = ({ token, refreshToken }) => {
  tokenList[refreshToken] = token
}

const isValidRefreshToken = refreshToken => refreshToken && refreshToken in tokenList

const generateAccessToken = user => jwt.sign(user, config.secret, { expiresIn: config.tokenLife })

const generateRefreshToken = user => jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })

const verifyAccessToken = accessToken => jwt.verify(accessToken, config.secret)

module.exports = {
  saveTokens,
  isValidRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
}
