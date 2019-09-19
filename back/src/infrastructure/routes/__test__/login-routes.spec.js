const request = require('supertest')
const app = require('../../../../app')
const { connect, refreshAccessToken } = require('../../../use_cases')

jest.mock('../../../use_cases')

describe('Integration | Routes | login route', () => {
  const email = 'email@example.org'
  const name = 'name'

  describe('#POST /login', () => {
    it('should call connect with user and tokenlist', async () => {
      // When
      await request(app).post('/api/login').send({ email, name })

      // Then
      expect(connect).toHaveBeenCalledWith({ user: { email, name } })
    })

    it('should return response', async () => {
      // Given
      connect.mockImplementation(() => 'response')

      // When
      const response = await request(app).post('/api/login').send({ email, name })

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual('response')
    })

    it('should return error when connect throw error', async () => {
      // Given
      connect.mockImplementation(() => { throw { message: 'message' } }) // eslint-disable-line no-throw-literal

      // When
      const response = await request(app).post('/api/login').send({ email, name })

      // Then
      expect(response.statusCode).toBe(401)
      expect(response.text).toEqual('message')
    })
  })

  describe('#POST /login/token', () => {
    const givenRefreshToken = 'refreshToken'

    it('should call connect with user and tokenlist', async () => {
      // When
      await request(app).post('/api/login/token').send({ email, name, refreshToken: givenRefreshToken })

      // Then
      expect(refreshAccessToken).toHaveBeenCalledWith({ user: { email, name }, refreshToken: givenRefreshToken })
    })

    it('should return response', async () => {
      // Given
      refreshAccessToken.mockImplementation(() => 'response')

      // When
      const response = await request(app).post('/api/login/token').send({ email, name })

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual('response')
    })

    it('should return error when refreshToken throw error', async () => {
      // Given
      refreshAccessToken.mockImplementation(() => { throw { message: 'message' } }) // eslint-disable-line no-throw-literal

      // When
      const response = await request(app).post('/api/login/token').send({ email, name })

      // Then
      expect(response.statusCode).toBe(403)
      expect(response.text).toEqual('message')
    })
  })
})
