const { numberOfDaysInLate } = require('../../infrastructure/utils/date-utils')

const ACCEPTABLE_NUMBER_OF_DAYS_IN_LATE = 7
const MINIMUM_AMOUNT_OF_POINTS_LEFT = 1
const MAXIMUM_NUMBER_OF_DAYS_IN_LATE = 365

const calculatePenaltyAdjustment = (penaltyDelay, optimalRelationshipDelay) => Math.exp(-penaltyDelay * 0.04 / optimalRelationshipDelay - penaltyDelay / MAXIMUM_NUMBER_OF_DAYS_IN_LATE)

const adjustPoints = (nextMeetingDate, points, optimalRelationshipDelay) => {
  const penaltyDelay = numberOfDaysInLate(nextMeetingDate) - ACCEPTABLE_NUMBER_OF_DAYS_IN_LATE
  if (penaltyDelay <= 0) {
    return points
  }
  if (penaltyDelay >= MAXIMUM_NUMBER_OF_DAYS_IN_LATE) {
    return MINIMUM_AMOUNT_OF_POINTS_LEFT
  }
  return Math.round(points * calculatePenaltyAdjustment(penaltyDelay, optimalRelationshipDelay))
}

module.exports = {
  adjustPoints,
}
