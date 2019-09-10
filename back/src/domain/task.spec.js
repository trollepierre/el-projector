const lolex = require('lolex')
const { init, enhance } = require('./task')
const { dummyTask } = require('../infrastructure/utils/test/dummy-task')

describe('Unit | Domain | task', () => {
  let now
  let clock

  beforeEach(() => {
    now = new Date('2018-07-21')
    clock = lolex.install({ now: now.valueOf() })
  })

  afterEach(() => {
    clock = clock.uninstall()
  })

  describe('#init()', () => {
    it('should return task with 50 points when given points are not defined', () => {
      // Given
      const task = dummyTask({ points: undefined })

      // When
      const initiatedTask = init(task)

      // Then
      expect(initiatedTask).toEqual({ ...task, points: 50 })
    })

    it('should return task with today as lastDate when not set', () => {
      // Given
      const task = dummyTask({ lastDate: undefined })

      // When
      const initiatedTask = init(task)

      // Then
      expect(initiatedTask).toEqual({ ...task, lastDate: '21/07/2018' })
    })
  })

  describe('#enhance()', () => {
    it('should return task when task has old last date', () => {
      // Given
      const task = dummyTask()

      // When
      const enhancedTask = enhance(task)

      // Then
      expect(enhancedTask).toEqual( {
        'address': '',
        'adjustedPoints': 1,
        'birthDate': '',
        'country': '',
        'firstName': 'Arthur',
        'lastDate': '04/11/1996',
        'lastName': 'King',
        'next': '05/11/1996',
        'nextBirthday': '',
        'nextMeetingDate': '05/11/1996',
        'origin': '',
        'points': 999,
      })
    })

    it('should return task when task is good friend', () => {
      // Given
      const task = dummyTask({ lastDate: '15/07/2018', birthDate: '19/10/1991' })

      // When
      const enhancedTask = enhance(task)

      // Then
      expect(enhancedTask).toEqual( {
        'address': '',
        'adjustedPoints': 999,
        'birthDate': '19/10/1991',
        'country': '',
        'firstName': 'Arthur',
        'lastDate': '15/07/2018',
        'lastName': 'King',
        'next': '16/07/2018',
        'nextBirthday': '19/10/2018',
        'nextMeetingDate': '16/07/2018',
        'origin': '',
        'points': 999,
      })
    })

    it('should return task when birthday is coming soon', () => {
      // Given
      const task = dummyTask({ lastDate: '15/07/2018', birthDate: '23/07/1991', points: 100 })

      // When
      const enhancedTask = enhance(task)

      // Then
      expect(enhancedTask).toEqual( {
        'address': '',
        'adjustedPoints': 100,
        'birthDate': '23/07/1991',
        'country': '',
        'firstName': 'Arthur',
        'lastDate': '15/07/2018',
        'lastName': 'King',
        'next': '23/07/2018',
        'nextBirthday': '23/07/2018',
        'nextMeetingDate': '13/09/2018',
        'origin': '',
        'points': 100,
      })
    })
  })
})
