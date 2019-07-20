const express = require('express')
const { isEmpty } = require('ramda')

const router = express.Router()
const { addTask } = require('../use_cases/add-task')
const taskService = require('../services/task-service')
const meetingService = require('../services/meeting-service')
const taskFixtures = require('./fixtures')

router.post('/', (req, res) => addTask(req.body)
  .then(createdTask => res.send(createdTask)))

router.get('/', (req, res) => {
  console.log('oui tasks route est appelé')

  return taskService.get()
    .then(tasks => res.send(tasks))
})

router.get('/:id/meeting', (req, res) => meetingService.add(req.params.id)
  .then(task => res.send(task)))

router.get('/:id/meeting/differ', (req, res) => meetingService.differ(req.params.id)
  .then(task => res.send(task)))

router.get('/:id/meeting/reject', (req, res) => meetingService.reject(req.params.id)
  .then(task => res.send(task)))

router.get('/init', (req, res) => taskService.get()
  .then(tasks => {
    if (!isEmpty(tasks)) {
      return res.sendStatus(401)
    }
    return Promise.all(taskFixtures.map(task => taskService.add(task)))
      .then(() => taskService.get())
      .then(everyTask => res.send(everyTask))
  }))

router.delete('/:id', (req, res) => taskService.delete(req.params.id)
  .then(() => res.sendStatus(204)))

router.patch('/:id', (req, res) => taskService.update(req.params.id, req.body)
  .then(updatedTask => res.send(updatedTask)))

module.exports = router
