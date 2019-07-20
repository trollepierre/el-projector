const { load } = require('dotenv-extended')
const { envKey } = require('./process')

const dotenvVars = load()

module.exports = key => {
  const processEnv = envKey(key)
  return processEnv !== undefined
    ? processEnv
    : dotenvVars[key]
}

