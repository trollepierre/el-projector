const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()
const config = require('./config')

const tokenList = {}

router.post('/', (req, res) => {
  console.log('you are here');

  const postData = req.body
  const user = {
    'email': postData.email,
    'name': postData.name,
  }
  // do the database authentication here, with user name and password combination.
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
  const response = {
    'status': 'Logged in',
    token,
    refreshToken,
  }
  tokenList[refreshToken] = response
  res.status(200).json(response)
})

router.post('/token', (req, res) => {
  // refresh the damn token
  const postData = req.body
  // if refresh token exists
  if(postData.refreshToken && (postData.refreshToken in tokenList)) {
    const user = {
      'email': postData.email,
      'name': postData.name,
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
    const response = {
      'token': token,
    }
    // update the token in the list
    tokenList[postData.refreshToken].token = token
    res.status(200).json(response)
  } else {
    res.status(404).send('Invalid request')
  }
})

router.use(require('./tokenChecker'))

router.get('/secure', (req, res) => {
  // all secured routes goes here
  res.send('I am secured...')
})

module.exports = router
