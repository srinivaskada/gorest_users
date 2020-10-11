'use strict'

const ApplicationError = require('../application-error')

module.exports = class CommonError extends ApplicationError {
  constructor (statusCode) {
    super()
    if (new.target === CommonError) {
      throw new Error(`cannot construct ${CommonError.name} instances directly`)
    }
    this.statusCode = statusCode
  }
}
