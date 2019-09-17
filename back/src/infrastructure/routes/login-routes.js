const express = require('express')
const { connect, refreshAccessToken } = require('../../use_cases')

const router = express.Router()

router.post('/', (req, res) => {
  const { email, name } = req.body
  try {
    const response = connect({ user: { email, name } })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(401).send(error.message)
  }
})

router.post('/token', (req, res) => {
  const { email, name, refreshToken } = req.body
  try {
    const response = refreshAccessToken({ user: { email, name }, refreshToken })
    return res.status(200).json(response)
  } catch (error) {
    return res.status(403).send(error.message)
  }
})

module.exports = router
