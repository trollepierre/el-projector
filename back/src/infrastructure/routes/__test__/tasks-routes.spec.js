const request = require('supertest')
const jsonwebtoken = require('jsonwebtoken')

const app = require('../../../../app')
const meetingService = require('../../../use_cases/meeting-service')
const taskService = require('../../../use_cases/task-service')
const { addTask } = require('../../../use_cases/add-task')
const { dummyTask } = require('../../utils/test/dummy-task')

jest.mock('jsonwebtoken')
jest.mock('../use_cases/add-task')

const tasksId = '1'
const task = dummyTask()
const tasks = [task]

describe('Integration | Routes | tasks route', () => {
  beforeEach(() => {
    jsonwebtoken.verify.mockImplementation(() => ({ userId: 'user-id', email: 'test@mail.com' }))
  })

  describe('#POST /', () => {
    beforeEach(() => {
      addTask.mockResolvedValue(task)
    })

    it('should call task service to add task', async () => {
      // When
      await request(app).post('/tasks').send({ task }).set('Authorization', 'Bearer access-token')

      // Then
      expect(addTask).toHaveBeenCalledWith({ task })
    })

    it('should return tasks', async () => {
      // When
      const response = await request(app).post('/tasks').set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(task)
    })
  })

  describe('#GET /', () => {
    beforeEach(() => {
      taskService.get = jest.fn()
      taskService.get.mockResolvedValue(tasks)
    })

    it('should call task service to add task', async () => {
      // When
      await request(app).get('/tasks').set('Authorization', 'Bearer access-token')

      // Then
      expect(taskService.get).toHaveBeenCalledWith()
    })

    it('should return tasks', async () => {
      // When
      const response = await request(app).get('/tasks').set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(tasks)
    })
  })

  describe('#GET /:id/meeting', () => {
    beforeEach(() => {
      meetingService.add = jest.fn()
      meetingService.add.mockResolvedValue(tasks)
    })

    it('should call meeting service to add', async () => {
      // When
      await request(app).get(`/tasks/${tasksId}/meeting`).set('Authorization', 'Bearer access-token')

      // Then
      expect(meetingService.add).toHaveBeenCalledWith(tasksId)
    })

    it('should return updated tasks', async () => {
      // When
      const response = await request(app).get(`/tasks/${tasksId}/meeting`).set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(tasks)
    })
  })

  describe('#GET /:id/meeting/differ', () => {
    beforeEach(() => {
      meetingService.differ = jest.fn()
      meetingService.differ.mockResolvedValue(task)
    })

    it('should call differing meeting service', async () => {
      // When
      await request(app).get(`/tasks/${tasksId}/meeting/differ`).set('Authorization', 'Bearer access-token')

      // Then
      expect(meetingService.differ).toHaveBeenCalledWith(tasksId)
    })

    it('should return updated task', async () => {
      // When
      const response = await request(app).get(`/tasks/${tasksId}/meeting/differ`).set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(task)
    })
  })

  describe('#GET /:id/meeting/reject', () => {
    beforeEach(() => {
      meetingService.reject = jest.fn()
      meetingService.reject.mockResolvedValue(task)
    })

    it('should call rejecting meeting service', async () => {
      // When
      await request(app).get(`/tasks/${tasksId}/meeting/reject`).set('Authorization', 'Bearer access-token')

      // Then
      expect(meetingService.reject).toHaveBeenCalledOnceWith(tasksId)
    })

    it('should return updated task', async () => {
      // When
      const response = await request(app).get(`/tasks/${tasksId}/meeting/reject`).set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(task)
    })
  })

  describe('#GET /init', () => {
    beforeEach(() => {
      taskService.get = jest.fn()
    })

    it('should call task service to get tasks', async () => {
      // Given
      taskService.get.mockResolvedValue(tasks)

      // When
      await request(app).get('/tasks/init').set('Authorization', 'Bearer access-token')

      // Then
      expect(taskService.get).toHaveBeenCalledOnceWith()
    })

    it('should return 401 status if array is empty', async () => {
      // Given
      taskService.get.mockResolvedValue(tasks)

      // When
      const response = await request(app).get('/tasks/init').set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual({})
    })

    xit('should reuse fixtures if tasks is empty', async () => {
      // Given
      taskService.get.mockResolvedValue([])

      // When
      const response = await request(app).get('/tasks/init').set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(401)
      expect(response.body).toEqual({})
    })
  })

  describe('#DELETE /:id', () => {
    beforeEach(() => {
      taskService.delete = jest.fn()
      taskService.delete.mockResolvedValue()
    })

    it('should call task service to delete', async () => {
      // When
      await request(app).delete(`/tasks/${tasksId}`).set('Authorization', 'Bearer access-token')

      // Then
      expect(taskService.delete).toHaveBeenCalledWith(tasksId)
    })

    it('should return 204 status', async () => {
      // When
      const response = await request(app).delete(`/tasks/${tasksId}`).set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(204)
      expect(response.body).toEqual({})
    })
  })

  describe('#PATCH /:id', () => {
    beforeEach(() => {
      taskService.update = jest.fn()
      taskService.update.mockResolvedValue(task)
    })

    it('should call task service to patch', async () => {
      // When
      await request(app).patch(`/tasks/${tasksId}`).send({ task }).set('Authorization', 'Bearer access-token')

      // Then
      expect(taskService.update).toHaveBeenCalledWith(tasksId, { task })
    })

    it('should return 204 status', async () => {
      // When
      const response = await request(app).patch(`/tasks/${tasksId}`).set('Authorization', 'Bearer access-token')

      // Then
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(task)
    })
  })
})
