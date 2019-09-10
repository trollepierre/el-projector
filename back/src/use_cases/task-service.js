// eslint-disable-next-line no-unused-vars
const { map } = require('ramda')
const { enhance } = require('../domain/task')
const { today } = require('../infrastructure/utils/date-utils')
const { getAll, create, update, delete: deleteTask } = require('../domain/repositories/task-repository')

async function add(task) {
  const taskWithPoints = task.points ? task : { ...task, points: 50 }
  const taskToCreate = task.lastDate
    ? taskWithPoints
    : { ...taskWithPoints, lastDate: today() }
  const createdTask = await create(taskToCreate)
  return enhance(createdTask)
}

function getTask() {
  // console.log('inside get task services')
  return getAll()
  // .then(map(enhance))
}

async function updateTask(id, task) {
  const updatedTask = await update(id, task)
  return enhance(updatedTask)
}

module.exports = {
  add,
  get: getTask,
  delete: deleteTask,
  update: updateTask,
}
