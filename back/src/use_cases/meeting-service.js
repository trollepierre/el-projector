const { addDays, formatDateWithLittleEndianLongFormat, today } = require('../domain/utils/date-utils')
const { calculateDiffer } = require('../domain/hidden-domain/estimate-optimal-delay')
const { get, update } = require('../domain/repositories/task-repository')
const { enhance } = require('../domain/task')

async function add(id) {
  const task = await get(id)
  const { adjustedPoints } = enhance(task)
  const newPoints = adjustedPoints + 10
  const lastDate = today()
  const updatedTask = await update(id, { points: newPoints, lastDate })
  return enhance(updatedTask)
}

async function differ(id) {
  const task = await get(id)
  const { adjustedPoints } = enhance(task)
  const minNext = formatDateWithLittleEndianLongFormat(addDays(7)(new Date()))
  const updatedTask = await update(id, { points: adjustedPoints, minNext } )
  return enhance(updatedTask)
}

async function reject(id) {
  const task = await get(id)
  const { adjustedPoints } = enhance(task)
  const points = Math.round(adjustedPoints * 0.75)
  const numberOfDaysToDiffer = calculateDiffer(points)
  const minNext = formatDateWithLittleEndianLongFormat(addDays(numberOfDaysToDiffer)(new Date()))
  const updatedTask = await update(id, { points, minNext } )
  return enhance(updatedTask)
}

module.exports = {
  add,
  differ,
  reject,
}
