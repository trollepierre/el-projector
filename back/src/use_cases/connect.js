const jwt = require('jsonwebtoken')

const config = {
  'secret': process.env.ACCESS_TOKEN_SECRET,
  'refreshTokenSecret': process.env.REFRESH_TOKEN_SECRET,
  'port': 3000,
  'tokenLife': 900,
  'refreshTokenLife': 86400,
}

const connect = ({ user, tokenList }) => {
  // do the database authentication here, with user name and password combination.
  if(user.name !== process.env.PASSWORD) throw new Error('Unauthorized')

  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })

  console.log('connect');
  console.log({tokenList});
  tokenList[refreshToken] = token
  console.log({tokenList});

  return {
    'status': 'Logged in',
    token,
    refreshToken,
  }
}

module.exports = {
  connect,
}

