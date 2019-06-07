import apiService from '../services/api-service'
import tasksApi from './tasks'
import tasksSorter from '../services/tasks-sorter'

describe('Unit | API | tasks api', () => {
  const id = 6
  const task = {
    id,
    name: 'toto',
  }

  describe('#fetch', () => {
    beforeEach(() => {
      apiService.get = jest.fn()
      tasksSorter.next = jest.fn()
    })

    it('should call apiService get with tasks url', async () => {
      // Given
      const expectedUrl = 'tasks'

      // When
      await tasksApi.fetch()

      // Then
      expect(apiService.get).toHaveBeenCalledOnceWith(expectedUrl)
    })

    it('should call tasksSorter next with tasksFromApi', async () => {
      // Given
      const apiResponse = 'tasks'
      apiService.get.mockResolvedValue(apiResponse)

      // When
      await tasksApi.fetch()

      // Then
      expect(tasksSorter.next).toHaveBeenCalledOnceWith(apiResponse)
    })

    it('should return tasks', async () => {
      // Given
      const apiResponse = 'tasks'
      tasksSorter.next.mockResolvedValue(apiResponse)

      // When
      const tasks = await tasksApi.fetch()

      // Then
      expect(tasks).toEqual(apiResponse)
    })
  })

  describe('#delete', () => {
    beforeEach(() => {
      apiService.delete = jest.fn()
    })

    it('should call apiService delete with delete url', async () => {
      // Given
      const expectedUrl = `tasks/${id}`

      // When
      await tasksApi.delete({ id })

      // Then
      expect(apiService.delete).toHaveBeenCalledOnceWith(expectedUrl)
    })

    it('should return answer from api', async () => {
      // Given
      const apiResponse = 'delete tasks'
      apiService.delete.mockResolvedValue(apiResponse)

      // When
      const tasks = await tasksApi.delete({ id })

      // Then
      expect(tasks).toEqual(apiResponse)
    })
  })

  describe('#update', () => {
    beforeEach(() => {
      apiService.put = jest.fn()
    })

    it('should call apiService put with update url', async () => {
      // Given
      const expectedUrl = `tasks/${id}`

      // When
      await tasksApi.update(task)

      // Then
      expect(apiService.put).toHaveBeenCalledOnceWith(expectedUrl, task)
    })

    it('should return answer from api', async () => {
      // Given
      const apiResponse = 'update tasks'
      apiService.put.mockResolvedValue(apiResponse)

      // When
      const tasks = await tasksApi.update(task)

      // Then
      expect(tasks).toEqual(apiResponse)
    })
  })

  describe('#create', () => {
    beforeEach(() => {
      apiService.post = jest.fn()
    })

    it('should call apiService post with create url', async () => {
      // Given
      const expectedUrl = 'tasks'

      // When
      await tasksApi.create(task)

      // Then
      expect(apiService.post).toHaveBeenCalledOnceWith(expectedUrl, task)
    })

    it('should return answer from api', async () => {
      // Given
      const apiResponse = 'create tasks'
      apiService.post.mockResolvedValue(apiResponse)

      // When
      const tasks = await tasksApi.create(task)

      // Then
      expect(tasks).toEqual(apiResponse)
    })
  })
})
