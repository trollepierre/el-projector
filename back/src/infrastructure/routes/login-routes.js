const express = require('express')
const { connect, refreshToken } = require('../../use_cases')

const router = express.Router()
const tokenList = {}

router.post('/', (req, res) => {
  const postData = req.body
  const user = {
    email: postData.email,
    name: postData.name,
  }

  try {
    const response = connect({ user, tokenList })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(401).send(error.message)
  }
})

router.post('/token', (req, res) => {
  const postData = req.body
  const user = {
    email: postData.email,
    name: postData.name,
  }

  try {
    const response = refreshToken({ user, tokenList, refreshToken: postData.refreshToken })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(403).send(error.message)
  }
})

module.exports = router
