const lolex = require('lolex')
const { subDays } = require('../../infrastructure/utils/date-utils')
const { adjustPoints } = require('./adjust-points')

describe('Unit | Domain | adjust-points', () => {
  let now
  let clock

  beforeEach(() => {
    now = new Date('2018-07-01')
    clock = lolex.install({ now: now.valueOf() })
  })

  afterEach(() => {
    clock = clock.uninstall()
  })

  describe('#adjustPoints()', () => {
    it('should TEST SOME CASE', () => {
      let nbDays = 1
      let nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(957)
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(693)
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(199)
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(6)

      nbDays = 5
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(807)
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(668)
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(196)
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(6)

      nbDays = 10
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(652)
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(637)
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(192)
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(6)

      // TODO improve this model of data
      nbDays = 20
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(425) // 550
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(580) // 500
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(185)
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(6)

      nbDays = 50
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(118) //  333
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(437) // 300
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(165)
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(5) // 3

      nbDays = 100
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(14) // 250
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(273) // 233
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(136) // 100
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(5) // 2

      nbDays = 364
      nextMeetingDate = subDays(nbDays + 7)(new Date())
      expect(adjustPoints(nextMeetingDate, 999, 1)).toEqual(0) // 100
      expect(adjustPoints(nextMeetingDate, 700, 6)).toEqual(23) // 70
      expect(adjustPoints(nextMeetingDate, 200, 35)).toEqual(49) // 50
      expect(adjustPoints(nextMeetingDate, 6, 365)).toEqual(2)
    })
  })
})
