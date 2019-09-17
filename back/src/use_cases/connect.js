/* eslint-disable no-console */
const { generateAccessToken, generateRefreshToken, saveTokens } = require('./services/token-service')
const { env } = require('../infrastructure/env')

const connect = ({ user }) => {
  // do the database authentication here, with user name and password combination.
  if (user.name !== env('PASSWORD')) {
    throw new Error('Unauthorized')
  }

  const token = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  saveTokens({ token, refreshToken })

  return {
    'status': 'Logged in',
    token,
    refreshToken,
  }
}

module.exports = {
  connect,
}

