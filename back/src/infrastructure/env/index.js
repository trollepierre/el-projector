const env = require('./env')
const { isDevelopment, isProduction } = require('./process')

module.exports = {
  env,
  isDevelopment,
  isProduction,
}
