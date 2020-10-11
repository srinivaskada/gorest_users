'use strict'

const express = require('express')

const usersController = require('./controllers/users-controller')

module.exports = openApiValidator => {
  const router = express.Router()
  router.get(
    '/users',
    usersController.getUsers
  )
  router.get('/users/export', usersController.exportUsers)
  router.patch('/users/:userId', usersController.updateUser)
  return router
}