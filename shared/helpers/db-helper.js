'use strict'

const { SEQUELIZE_DEFAULT_OPTIONS } = require('../constants/db')
const Sequelize = require(`${process.env.PWD}/node_modules/sequelize`)
let connection

module.exports = {
  getConnection (models = []) {
    if (!connection) {
      connection = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        Object.assign({ host: process.env.DB_HOST }, SEQUELIZE_DEFAULT_OPTIONS)
      )
      models.forEach(model => model.load(connection))
    }
    return connection
  }
}
