const lolex = require('lolex')
const taskService = require('./task-service')
const { Task } = require('../models')

describe('Unit | Service | task-service', () => {
  let now
  let clock

  beforeEach(() => {
    now = new Date('2018-07-01')
    clock = lolex.install({ now: now.valueOf() })
  })

  afterEach(() => {
    clock = clock.uninstall()
  })

  const taskFromFront = {
    id: '42',
    firstName: 'Pierre',
    lastName: 'Trollé',
    points: 999,
    lastDate: '11/05/2018',
    birthDate: '19/10/1991',
    origin: 'Moi',
    country: 'France',
    address: '11 rue du Plouy 62140 Fressin',
  }
  const taskFromDb = {
    id: '42',
    firstName: 'Pierre',
    lastName: 'Trollé',
    points: 999,
    minNext: '24/06/2018',
    lastDate: '11/05/2018',
    birthDate: '19/10/1991',
    origin: 'Moi',
    country: 'France',
    address: '11 rue du Plouy 62140 Fressin',
  }
  const taskForFront = {
    id: '42',
    firstName: 'Pierre',
    lastName: 'Trollé',
    points: 999,
    lastDate: '11/05/2018',
    minNext: '24/06/2018',
    next: '24/06/2018',
    nextMeetingDate: '12/05/2018',
    nextBirthday: '19/10/2018',
    birthDate: '19/10/1991',
    origin: 'Moi',
    country: 'France',
    address: '11 rue du Plouy 62140 Fressin',
    adjustedPoints: 159,
  }
  const createdTask = {
    ...taskFromFront,
    id: 1,
  }

  describe('#add', () => {
    beforeEach(() => {
      Task.create = jest.fn()
      Task.create.mockResolvedValue(createdTask)
    })

    it('should call Sequelize Model#create', async () => {
      // When
      await taskService.add(taskFromFront)

      // Then
      expect(Task.create).toHaveBeenCalledOnceWith({ ...taskFromFront })
    })

    it('should add 50 points to tasks without points', async () => {
      // Given
      const taskFromFrontWithoutPoints = {
        ...taskFromFront,
        points: undefined,
      }
      const taskFromFrontWithFiftyPoints = {
        ...taskFromFront,
        points: 50,
      }

      // When
      await taskService.add(taskFromFrontWithoutPoints)

      // Then
      expect(Task.create).toHaveBeenCalledOnceWith({ ...taskFromFrontWithFiftyPoints })
    })

    it('should set today as lastDate to tasks without lastDate', async () => {
      // Given
      const taskFromFrontWithoutPoints = {
        ...taskFromFront,
        lastDate: undefined,
      }
      const taskFromFrontWithFiftyPoints = {
        ...taskFromFront,
        lastDate: '01/07/2018',
      }

      // When
      await taskService.add(taskFromFrontWithoutPoints)

      // Then
      expect(Task.create).toHaveBeenCalledOnceWith({ ...taskFromFrontWithFiftyPoints })
    })

    it('should return created task with next', async () => {
      // Given
      const createdTaskForFront = {
        ...taskForFront,
        id: 1,
        minNext: undefined,
        next: '12/05/2018',
      }
      // When
      const res = await taskService.add(taskFromFront)

      // Then
      expect(res).toEqual(createdTaskForFront)
    })
  })

  describe('#get', () => {
    beforeEach(() => {
      Task.findAll = jest.fn()
      Task.findAll.mockResolvedValue([taskFromDb])
    })

    it('should call Sequelize Model#findAll', async () => {
      // When
      await taskService.get()

      // Then
      expect(Task.findAll).toHaveBeenCalledOnceWith()
    })

    it('should return tasks with next, nextMeetingDate and nextBirthday', async () => {
      // When
      const res = await taskService.get()

      // Then
      expect(res).toEqual([taskForFront])
    })
  })

  describe('#update', () => {
    const id = 'id-6'

    beforeEach(() => {
      Task.update = jest.fn()
      Task.findOne = jest.fn()
      Task.findOne.mockResolvedValue(taskFromDb)
    })

    it('should call Sequelize Model#update', async () => {
      // When
      await taskService.update(id, taskFromFront)

      // Then
      expect(Task.update).toHaveBeenCalledOnceWith({ ...taskFromFront }, { where: { id } })
    })

    it('should call Sequelize Model#findOne', async () => {
      // When
      await taskService.update(id, taskFromFront)

      // Then
      expect(Task.findOne).toHaveBeenCalledOnceWith({ where: { id } })
    })

    it('should return tasks with next, nextMeetingDate and nextBirthday', async () => {
      // When
      const res = await taskService.update(id, taskFromFront)

      // Then
      expect(res).toEqual(taskForFront)
    })
  })
})
