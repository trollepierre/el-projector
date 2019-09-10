const { init, enhance } = require('../domain/task')
const { create: save } = require('../domain/repositories/task-repository')

const addTask = async taskFromFront => {
  const taskToCreate = init(taskFromFront)
  const createdTaskFromDb = await save(taskToCreate)
  return enhance(createdTaskFromDb)
}

module.exports = {
  addTask,
}
