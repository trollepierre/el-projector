const express = require('express')
const { isEmpty } = require('ramda')

const router = express.Router()
const taskService = require('../../use_cases/task-service')
const fileService = require('../services/file-service')
const taskFixtures = require('./fixtures')
const { formatDateWithInternationalLongDateTimeFormat } = require('../utils/date-utils')

router.get('/', (req, res) => {
  const now = formatDateWithInternationalLongDateTimeFormat(new Date())
  return taskService.get()
    .then(tasks => {
      const p = JSON.stringify(tasks)
      return fileService.write(p, `save/tasksTable-${now}.json`)
    })
    .then(() => res.sendStatus(200))
})

router.get('/init', (req, res) => taskService.get()
  .then(tasks => {
    if (!isEmpty(tasks)) {
      return res.sendStatus(401)
    }
    return Promise.all(taskFixtures.map(task => taskService.add(task)))
      .then(() => taskService.get())
      .then(everyTask => res.send(everyTask))
  }))

module.exports = router
