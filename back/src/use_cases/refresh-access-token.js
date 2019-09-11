const { isValidRefreshToken, generateAccessToken, saveTokens } = require('./services/token-service')

const refreshAccessToken = ({ refreshToken, user }) => {
  if (!isValidRefreshToken(refreshToken)) {
    throw new Error('Reconnection needed')
  }
  const token = generateAccessToken(user)
  saveTokens({ token, refreshToken })
  return {
    'status': 're-Logged in',
    token,
    refreshToken,
  }
}

module.exports = {
  refreshAccessToken,
}

