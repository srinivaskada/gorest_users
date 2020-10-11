'use strict'

const { Model, INTEGER, STRING } = require(`${process.env.PWD}/node_modules/sequelize`)
const { MALE, FEMALE, ACTIVE, INACTIVE } = require('../constants/common')

class User extends Model {
  static load (sequelize) {
    super.init(
      {
        id: { type: INTEGER, autoIncrement: true, primaryKey: true },
        goRestId: INTEGER,
        name: STRING,
        email: STRING,
        gender: {
          type: STRING,
          validate: { isIn: [[MALE, FEMALE]] }
        },
        status: {
          type: STRING,
          validate: { isIn: [[ACTIVE, INACTIVE]] }
        },
      },
      {
        sequelize
      }
    )
  }
}

module.exports = User
