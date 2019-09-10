const express = require('express')
const { connect, refreshToken } = require('../../use_cases')

const router = express.Router()
const tokenList = {}

router.post('/', (req, res) => {
  const { email, name } = req.body
  try {
    const response = connect({ user: { email, name }, tokenList })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(401).send(error.message)
  }
})

router.post('/token', (req, res) => {
  const { email, name, refreshToken: token } = req.body
  try {
    const response = refreshToken({ user: { email, name }, tokenList, refreshToken: token })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(403).send(error.message)
  }
})

module.exports = router
