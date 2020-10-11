'use strict'

const { format } = require('util')
const fetchGorestUsers = require('./fetch-gorest-users')
const dbHelper = require('../../shared/helpers/db-helper')
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
    await fetchGorestUsers()
  } catch (ex) {
    console.error('service unable to start', ex)
    process.exit(1)
  }
})()
