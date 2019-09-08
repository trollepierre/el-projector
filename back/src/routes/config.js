module.exports = {
  'secret': process.env.ACCESS_TOKEN_SECRET,
  'refreshTokenSecret': process.env.REFRESH_TOKEN_SECRET,
  'port': 3000,
  'tokenLife': 900,
  'refreshTokenLife': 86400,
}
