'use strict'

module.exports = {
  SEQUELIZE_DEFAULT_OPTIONS: {
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8mb4',
      dialectOptions: { collate: 'utf8mb4_unicode_ci' }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
