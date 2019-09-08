const express = require('express')
const jwt = require('jsonwebtoken')

const { connect } = require('../use_cases')

const router = express.Router()

const tokenList = {}

const config = {
  'secret': process.env.ACCESS_TOKEN_SECRET,
  'refreshTokenSecret': process.env.REFRESH_TOKEN_SECRET,
  'port': 3000,
  'tokenLife': 900,
  'refreshTokenLife': 86400,
}

router.post('/', (req, res) => {
  const postData = req.body
  const user = {
    email: postData.email,
    name: postData.name,
  }

  try {
    const response = connect(user)
    tokenList[response.refreshToken] = response
    return res.status(200).json(response)
  } catch(error) {
    return res.status(401).send(error.message)
  }
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

module.exports = router
