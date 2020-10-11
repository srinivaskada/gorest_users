'use strict'

const CommonError = require('./common-error')
const { INTERNAL_SERVER_ERROR } = require(`${process.env.PWD}/node_modules/http-status-codes`)

module.exports = class UnknownError extends CommonError {
  constructor (message) {
    super(INTERNAL_SERVER_ERROR)
    this.message = message || 'internal server error'
    this.name = UnknownError.name
  }
}
