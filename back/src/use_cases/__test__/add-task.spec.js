const lolex = require('lolex')
const { addTask } = require('../add-task')
const { Task } = require('../../domain/models')

describe('add-task', () => {
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
      await addTask(taskFromFront)

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
      await addTask(taskFromFrontWithoutPoints)

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
      await addTask(taskFromFrontWithoutPoints)

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
      const addedTask = await addTask(taskFromFront)

      // Then
      expect(addedTask).toEqual(createdTaskForFront)
    })
  })
})

