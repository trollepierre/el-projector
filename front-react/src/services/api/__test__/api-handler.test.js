import axios from 'axios'

import { loggerService, tokenService } from '../../index'
import { axiosHandler } from '../api-handler'

jest.mock('axios')

describe('axiosHandler', () => {

  const data = { hello: 'world' }
  const path = 'tasks'
  let updateMock

  beforeEach(() => {
    updateMock = jest.fn()
  })

  describe('when the promise resolves data', () => {
    beforeEach(() => {
      axios.mockResolvedValue({ data })
    })

    it('should call the correct API status endpoint', async () => {
      // When
      await axiosHandler('get', updateMock)(path, data)

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        data: { 'hello': 'world' },
        headers: {},
        method: 'get',
        url: 'http://localhost:3001/api/tasks',
      })
    })

    it('should call the correct API status endpoint with undefined data when data not set', async () => {
      // When
      await axiosHandler('get', updateMock)(path)

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        headers: {},
        method: 'get',
        url: 'http://localhost:3001/api/tasks',
      })
    })

    it('should call the correct API status endpoint with bearer access token when providen', async () => {
      // Given
      tokenService.getAccessToken = jest.fn(() => 'access token')

      // When
      await axiosHandler('get', updateMock)(path, data)

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        data: { 'hello': 'world' },
        headers: { 'Authorization': 'Bearer access token' },
        method: 'get',
        url: 'http://localhost:3001/api/tasks',
      })
    })

    it('should call the correct API status endpoint in production', async () => {
      // Given
      tokenService.getAccessToken = jest.fn(() => 'access token')
      process.env.NODE_ENV = 'production'

      // When
      await axiosHandler('get', updateMock)(path, data)

      // Then
      expect(axios).toHaveBeenLastCalledWith({
        data: { 'hello': 'world' },
        headers: { 'Authorization': 'Bearer access token' },
        method: 'get',
        url: 'http://localhost/api/tasks',
      })

      // After
      process.env.NODE_ENV = 'test'
    })

    it('should return response data', async () => {
      // When
      const response = await axiosHandler('get', x => x)(path, data)

      // Then
      expect(response).toEqual({ data })
    })
  })

  describe('when the promise rejects', () => {
    beforeEach(() => {
      axios.mockRejectedValue('error')
      loggerService.error = jest.fn()
    })

    it('should log the error', async () => {
      // When
      try {
        await axiosHandler('get', updateMock)(path, data)
      } catch (error) {
        // Then
        expect(loggerService.error).toHaveBeenCalledWith('error')
        expect(error).toEqual('error')
      }
    })
  })
})
