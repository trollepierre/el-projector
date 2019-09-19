const jwt = require('jsonwebtoken')
const { env } = require('../../infrastructure/env')

const config = {
  secret: env('ACCESS_TOKEN_SECRET'),
  refreshSecret: env('REFRESH_TOKEN_SECRET'),
  tokenLife: parseInt(env('ACCESS_TOKEN_LIFE_TIME'), 10),
  refreshLife: parseInt(env('REFRESH_TOKEN_LIFE_TIME'), 10),
}

const tokenList = {}

const saveTokens = ({ token, refreshToken }) => {
  tokenList[refreshToken] = token
}

const isValidRefreshToken = refreshToken => refreshToken && refreshToken in tokenList

const generateAccessToken = user => jwt.sign(user, config.secret, { expiresIn: config.tokenLife })

const generateRefreshToken = user => jwt.sign(user, config.refreshSecret, { expiresIn: config.refreshLife })

const verifyAccessToken = accessToken => jwt.verify(accessToken, config.secret)

module.exports = {
  saveTokens,
  isValidRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
}
