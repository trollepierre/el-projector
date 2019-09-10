const { isEmpty } = require('ramda')

const fs = require('fs')
const taskService = require('../../use_cases/task-service')

const files = fs.readdirSync('save')

function init() {
  const path = `save/${files[files.length - 1]}`

  fs.readFile(path, 'utf8', async (err, data) => {
    if (err) throw err
    const tasks = await taskService.get()
    if (isEmpty(tasks)) {
      return Promise.all(JSON.parse(data).map(task => taskService.add(task)))
        .then(() => taskService.get())
    }
    // eslint-disable-next-line no-console
    return console.error('error')
  })
}

module.exports = {
  init,
}
