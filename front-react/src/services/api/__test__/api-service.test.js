import apiService from '../api-service'

jest.mock('../api-handler', () => ({ axiosHandler: (method, update) => () => ({ method, update }) }))

describe('apiService', () => {
  const givenPropsForRamda = { data: 'data', status: 'status' }

  describe('get', () => {
    it('should call axios handler with correct method and update data', () => {
      // When
      const returnedValue = apiService.get()

      // Then
      expect(returnedValue).toEqual(expect.objectContaining({ method: 'get' }))
      expect(returnedValue.update(givenPropsForRamda)).toEqual('data')
    })
  })

  describe('post', () => {
    it('should call axios handler with correct method and update data', () => {
      // When
      const returnedValue = apiService.post()

      // Then
      expect(returnedValue).toEqual(expect.objectContaining({ method: 'post' }))
      expect(returnedValue.update(givenPropsForRamda)).toEqual('data')
    })
  })

  describe('put', () => {
    it('should call axios handler with correct method and update status', () => {
      // When
      const returnedValue = apiService.put()

      // Then
      expect(returnedValue).toEqual(expect.objectContaining({ method: 'put' }))
      expect(returnedValue.update(givenPropsForRamda)).toEqual('status')
    })
  })

  describe('delete', () => {
    it('should call axios handler with correct method and update status', () => {
      // When
      const returnedValue = apiService.delete()

      // Then
      expect(returnedValue).toEqual(expect.objectContaining({ method: 'delete' }))
      expect(returnedValue.update(givenPropsForRamda)).toEqual('status')
    })
  })
})
