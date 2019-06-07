const moment = require('moment')
const taskService = require('../src/services/task-service');
const fileService = require('../src/services/file-service');

let now = moment().format('YYYY-MM-DD:HH:mm:ss');
taskService.get()
  .then(tasks => {
    const p = JSON.stringify(tasks)
    return fileService.write(p, `save/tasksTable-${now}.json`);
  })
