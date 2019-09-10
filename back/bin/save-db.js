const moment = require('moment')
const taskService = require('../src/use_cases/task-service')
const fileService = require('../src/infrastructure/services/file-service')

const now = moment().format('YYYY-MM-DD:HH:mm:ss')
taskService.get()
  .then(tasks => {
    const p = JSON.stringify(tasks)
    return fileService.write(p, `save/tasksTable-${now}.json`)
  })
