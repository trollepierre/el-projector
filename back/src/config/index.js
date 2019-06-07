require('dotenv').config()

function config() {
  const APP_ENV = {
    API_URL: 'to-be-defined',
  }
  if (process.env.NODE_ENV === 'development') {
    APP_ENV.API_URL = 'localhost:3000'
  }
  if (process.env.NODE_ENV === 'test') {
    APP_ENV.API_URL = 'localhost:3000'
  }

  return APP_ENV
}

module.exports = config()
