'use strict'

const { format } = require('util')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const dbHelper = require('../../shared/helpers/db-helper')
const errorMiddleware = require('../../shared/middleware/error-middleware')
const { API_V1_BASE_PATH } = require('../../shared/constants/common')
const { InvalidRouteError } = require('../../shared/errors/common')
const { SERVICE_NAME } = require('./constants')

const models = require('./models')

;(async () => {
  try {
    const dbConnection = dbHelper.getConnection([
      ...Object.values(models)
    ])
    await dbConnection.authenticate()
    for (const model of Object.values(dbConnection.models)) {
      await model.sync({
        alter: true
      })
    }
    const app = express()
    app.use(bodyParser.json())
    app.use(format(API_V1_BASE_PATH, SERVICE_NAME), router())
    app.use((req, res, next) => next(new InvalidRouteError()))
    app.use(errorMiddleware)
    const server = http.createServer(app)
    server.listen(process.env.APP_PORT, () => {
      console.log('process.env.APP_PORT', process.env.APP_PORT)
      console.log('service start')
    })
  } catch (ex) {
    console.error('service unable to start', ex)
    process.exit(1)
  }
})()
