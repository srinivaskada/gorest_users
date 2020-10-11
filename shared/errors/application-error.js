'use strict'

module.exports = class ApplicationError extends Error {
  constructor () {
    super()
    if (new.target === ApplicationError) {
      throw new Error(
        `cannot construct ${ApplicationError.name} instances directly`
      )
    }
  }
}
