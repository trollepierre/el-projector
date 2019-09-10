const jwt = require('jsonwebtoken')

const config = {
  'secret': process.env.ACCESS_TOKEN_SECRET,
  'refreshTokenSecret': process.env.REFRESH_TOKEN_SECRET,
  'port': 3000,
  'tokenLife': 900,
  'refreshTokenLife': 86400,
}

const refreshToken = ({ refreshToken: refreshT, user, tokenList }) => {
  console.log({ refreshToken});
  console.log({ refreshT });
  console.log({ tokenList });

  console.log(refreshT in tokenList);

  if (!refreshT || !(refreshT in tokenList)) {
    throw new Error('Reconnection needed')
  }
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })

  console.log('refresh');
  console.log({tokenList});
  tokenList[refreshT] = token
  console.log({tokenList});

  return {
    'status': 're-Logged in',
    token,
    refreshToken: refreshT,
  }
}

module.exports = {
  refreshToken,
}

