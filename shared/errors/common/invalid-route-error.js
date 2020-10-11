'use strict'

const CommonError = require('./common-error')
const { NOT_FOUND } = require(`${process.env.PWD}/node_modules/http-status-codes`)

module.exports = class InvalidRouteError extends CommonError {
  constructor () {
    super(NOT_FOUND)
    this.message = 'invalid route requested'
    this.name = InvalidRouteError.name
  }
}
