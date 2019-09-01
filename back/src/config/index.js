require('dotenv').config()

function config() {
  const APP_ENV = {
    ACCESS_TOKEN_SECRET: 'some-secret-shit-goes-here',
  }
  if (process.env.NODE_ENV === 'development') {
    APP_ENV.ACCESS_TOKEN_SECRET = 'some-secret-shit-goes-here'
  }
  if (process.env.NODE_ENV === 'test') {
    APP_ENV.ACCESS_TOKEN_SECRET = 'access-token-password'
  }
  return APP_ENV
}

module.exports = config()
