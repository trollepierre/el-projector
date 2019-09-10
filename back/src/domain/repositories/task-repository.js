const { Task } = require('../models')

function get(id) {
  return Task.findOne({ where: { id } })
}

async function update(id, task) {
  await Task.update(task, { where: { id } })
  return Task.findOne({ where: { id } })
}

function create(task) {
  return Task.create(task)
}

function deleteTask(id) {
  return Task.destroy({ where: { id } })
}

function getAll() {
  return Task.findAll()
}

module.exports = {
  get,
  getAll,
  update,
  create,
  delete: deleteTask,
}
