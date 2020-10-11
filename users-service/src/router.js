'use strict'

const express = require('express')

module.exports = openApiValidator => {
  const router = express.Router()
  router.get(
    '/users',
    (req, res) => {
      res.status(200).json({
        status: 'iam fine'
      })
    }
  )
  return router
}