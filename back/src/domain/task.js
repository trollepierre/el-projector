const { pick } = require('ramda')
const { today } = require('../infrastructure/utils/date-utils')
const { estimateOptimalDelay } = require('./hidden-domain/estimate-optimal-delay')
const { adjustPoints } = require('./hidden-domain/adjust-points')
const {
  formatDateWithLittleEndianLongFormat,
  earliestDate,
  latestDate,
  addDays,
  determineNextBirthday,
  parseDate,
  isValid,
} = require('../infrastructure/utils/date-utils')

const init = task => ({
  ...task,
  points: task.points ? task.points : 50,
  lastDate: task.lastDate ? task.lastDate : today(),
})

const determinenextMeetingDatesToKit = (birthDate, regularMeetingDate) => {
  if (isValid(birthDate)) {
    const nextBirthday = determineNextBirthday(birthDate)
    return {
      nextBirthday: nextBirthday,
      nextMeetingDate: regularMeetingDate,
      nextDateToKit: earliestDate(nextBirthday, regularMeetingDate),
    }
  }
  return {
    nextBirthday: null,
    nextMeetingDate: regularMeetingDate,
    nextDateToKit: regularMeetingDate,
  }
}

const determineNextOccasionToMeet = (delay, lastDate, birthDate) => {
  const regularMeetingDate = addDays(delay)(parseDate(lastDate))
  return determinenextMeetingDatesToKit(parseDate(birthDate), regularMeetingDate)
}

const enhance = taskFromDb => {
  const task = pick(['id', 'firstName', 'lastName', 'points', 'lastDate', 'minNext', 'birthDate', 'origin', 'country', 'address'])(taskFromDb)
  const { points, lastDate, birthDate, minNext } = task
  const optimalRelationshipDelay = estimateOptimalDelay(points)
  const { nextDateToKit, nextBirthday, nextMeetingDate } = determineNextOccasionToMeet(optimalRelationshipDelay, lastDate, birthDate)
  const next = minNext ? latestDate(nextDateToKit, parseDate(minNext)) : nextDateToKit
  return {
    ...task,
    adjustedPoints: adjustPoints(nextMeetingDate, points, optimalRelationshipDelay),
    nextMeetingDate: formatDateWithLittleEndianLongFormat(nextMeetingDate),
    nextBirthday: formatDateWithLittleEndianLongFormat(nextBirthday),
    next: formatDateWithLittleEndianLongFormat(next),
  }
}

module.exports = {
  init,
  enhance,
}
