const { connect } = require('./connect')
const { refreshAccessToken } = require('./refresh-access-token')
const { addTask } = require('./add-task')
const taskService = require('./task-service')
const meetingService = require('./meeting-service')

module.exports = {
  connect,
  refreshAccessToken,
  addTask,
  meetingService,
  taskService,
}
