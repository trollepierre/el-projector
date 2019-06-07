const { today } = require('../utils/date-utils')

const { get, update } = require('../repositories/task-repository')
const { enhance } = require('../domain/task')

async function addMeeting(id) {
  const task = await get(id)
  const { adjustedPoints } = enhance(task)
  const taskWithFieldToUpdate = {
    points: adjustedPoints + 10,
    lastDate: today(),
  }
  const updatedTask = await update(id, taskWithFieldToUpdate)
  return enhance(updatedTask)
}

module.exports = {
  addMeeting,
}
