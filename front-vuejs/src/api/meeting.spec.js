import apiService from '../services/api-service'
import meetingApi from './meeting'

describe('Unit | API | meetings api', () => {
  const id = 6

  describe('#meet', () => {
    beforeEach(() => {
      apiService.get = jest.fn()
    })

    it('should call apiService get with meeting url', async () => {
      // Given
      const expectedUrl = `tasks/${id}/meeting`

      // When
      await meetingApi.meet({ id })

      // Then
      expect(apiService.get).toHaveBeenCalledOnceWith(expectedUrl)
    })

    it('should return meeting', async () => {
      // Given
      const apiResponse = 'meeting'
      apiService.get.mockResolvedValue(apiResponse)

      // When
      const meeting = await meetingApi.meet({ id })

      // Then
      expect(meeting).toEqual(apiResponse)
    })
  })

  describe('#differ', () => {
    beforeEach(() => {
      apiService.get = jest.fn()
    })

    it('should call apiService get with differ url', async () => {
      // Given
      const expectedUrl = `tasks/${id}/meeting/differ`

      // When
      await meetingApi.differ({ id })

      // Then
      expect(apiService.get).toHaveBeenCalledOnceWith(expectedUrl)
    })

    it('should return differed meeting', async () => {
      // Given
      const apiResponse = 'differ meeting'
      apiService.get.mockResolvedValue(apiResponse)

      // When
      const meeting = await meetingApi.differ({ id })

      // Then
      expect(meeting).toEqual(apiResponse)
    })
  })

  describe('#reject', () => {
    beforeEach(() => {
      apiService.get = jest.fn()
    })

    it('should call apiService get with reject url', async () => {
      // Given
      const expectedUrl = `tasks/${id}/meeting/reject`

      // When
      await meetingApi.reject({ id })

      // Then
      expect(apiService.get).toHaveBeenCalledOnceWith(expectedUrl)
    })

    it('should return rejected meeting', async () => {
      // Given
      const apiResponse = 'reject meeting'
      apiService.get.mockResolvedValue(apiResponse)

      // When
      const meeting = await meetingApi.reject({ id })

      // Then
      expect(meeting).toEqual(apiResponse)
    })
  })
})
