const DEVELOPMENT_MODE = 'development'
const PRODUCTION_MODE = 'production'

function envKey(key) {
  return process.env[key]
}

function isProduction() {
  return envKey('NODE_ENV_HEROKU') === PRODUCTION_MODE
}

function isDevelopment() {
  return envKey('NODE_ENV') === DEVELOPMENT_MODE
}

module.exports = {
  envKey,
  isDevelopment,
  isProduction,
}

