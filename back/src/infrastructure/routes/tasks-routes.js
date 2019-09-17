const express = require('express')
const { isEmpty } = require('ramda')

const router = express.Router()
const { addTask } = require('../../use_cases/add-task')
const taskService = require('../../use_cases/task-service')
const meetingService = require('../../use_cases/meeting-service')
const taskFixtures = require('./fixtures')
const { auth } = require('../services/auth')

router.post('/', auth, (req, res) => addTask(req.body)
  .then(createdTask => res.send(createdTask)))

router.get('/', auth, (req, res) => taskService.get()
  .then(tasks => res.send(tasks)))

router.get('/:id/meeting', auth, (req, res) => meetingService.add(req.params.id)
  .then(task => res.send(task)))

router.get('/:id/meeting/differ', auth, (req, res) => meetingService.differ(req.params.id)
  .then(task => res.send(task)))

router.get('/:id/meeting/reject', auth, (req, res) => meetingService.reject(req.params.id)
  .then(task => res.send(task)))

router.get('/init', auth, (req, res) => taskService.get()
  .then(tasks => {
    if (!isEmpty(tasks)) {
      return res.sendStatus(401)
    }
    return Promise.all(taskFixtures.map(task => taskService.add(task)))
      .then(() => taskService.get())
      .then(allTasks => res.send(allTasks))
  }))

router.delete('/:id', auth, (req, res) => taskService.delete(req.params.id)
  .then(() => res.sendStatus(204)))

router.patch('/:id', auth, (req, res) => taskService.update(req.params.id, req.body)
  .then(updatedTask => res.send(updatedTask)))

module.exports = router
