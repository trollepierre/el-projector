const lolex = require('lolex')
const meetingService = require('../meeting-service')
const { Task } = require('../../domain/models')

describe('Unit | Service | meeting-service', () => {
  const id = 'id concerned task'
  let now
  let clock

  beforeEach(() => {
    now = new Date('2018-07-01')
    clock = lolex.install({ now: now.valueOf() })
  })

  afterEach(() => {
    clock = clock.uninstall()
  })

  const pointsFromDb = 500
  const taskFromDb = {
    id: '42',
    firstName: 'Pierre',
    lastName: 'Trollé',
    points: pointsFromDb,
    minNext: '24/06/2018',
    lastDate: '11/05/2018',
    birthDate: '19/10/1991',
    origin: 'Moi',
    country: 'France',
    address: '11 rue du Plouy 62140 Fressin',
  }
  const expectedAdjustedPoints = 427
  const taskForFront = {
    id: '42',
    firstName: 'Pierre',
    lastName: 'Trollé',
    points: pointsFromDb,
    lastDate: '11/05/2018',
    minNext: '24/06/2018',
    next: '24/06/2018',
    nextMeetingDate: '26/05/2018',
    nextBirthday: '19/10/2018',
    birthDate: '19/10/1991',
    origin: 'Moi',
    country: 'France',
    address: '11 rue du Plouy 62140 Fressin',
    adjustedPoints: expectedAdjustedPoints,
  }

  describe('#add()', () => {
    beforeEach(() => {
      Task.findOne = jest.fn()
      Task.update = jest.fn()
      Task.findOne.mockResolvedValue(taskFromDb)
    })

    it('should call Sequelize Model#findOne', async () => {
      // When
      await meetingService.add(id)

      // Then
      expect(Task.findOne).toHaveBeenCalledTimes(2)
      expect(Task.findOne).toHaveBeenCalledWith({ where: { id } })
    })

    it('should call Sequelize Model#update with calculated points and minNext', async () => {
      // Given
      const points = expectedAdjustedPoints + 10
      const lastDate = '01/07/2018'

      // When
      await meetingService.add(id)

      // Then
      expect(Task.update).toHaveBeenCalledOnceWith({ points, lastDate }, { where: { id } })
    })

    it('should return created meeting with next', async () => {
      // When
      const res = await meetingService.add(id)

      // Then
      expect(res).toEqual(taskForFront)
    })
  })

  describe('#differ()', () => {
    beforeEach(() => {
      Task.findOne = jest.fn()
      Task.update = jest.fn()
      Task.findOne.mockResolvedValue(taskFromDb)
    })

    it('should call Sequelize Model#findOne', async () => {
      // When
      await meetingService.differ(id)

      // Then
      expect(Task.findOne).toHaveBeenCalledTimes(2)
      expect(Task.findOne).toHaveBeenCalledWith({ where: { id } })
    })

    it('should call Sequelize Model#update with calculated minNext', async () => {
      // Given
      const minNext = '08/07/2018'

      // When
      await meetingService.differ(id)

      // Then
      expect(Task.update).toHaveBeenCalledOnceWith({ minNext, points: expectedAdjustedPoints }, { where: { id } })
    })

    it('should return differed task', async () => {
      // When
      const differedTask = await meetingService.differ(id)

      // Then
      expect(differedTask).toEqual(taskForFront)
    })
  })

  describe('#reject()', () => {
    beforeEach(() => {
      Task.findOne = jest.fn()
      Task.update = jest.fn()
      Task.findOne.mockResolvedValue(taskFromDb)
    })

    it('should call Sequelize Model#findOne', async () => {
      // When
      await meetingService.reject(id)

      // Then
      expect(Task.findOne).toHaveBeenCalledTimes(2)
      expect(Task.findOne).toHaveBeenCalledWith({ where: { id } })
    })

    it('should call Sequelize Model#update with calculated points and minNext', async () => {
      // Given
      const pointsAfterRejection = 320
      const minNext = '13/07/2018'

      // When
      await meetingService.reject(id)

      // Then
      expect(Task.update).toHaveBeenCalledOnceWith({ points: pointsAfterRejection, minNext }, { where: { id } })
    })

    it('should return rejected task', async () => {
      // When
      const rejectedTask = await meetingService.reject(id)

      // Then
      expect(rejectedTask).toEqual(taskForFront)
    })
  })
})

