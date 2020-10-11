'use strict'

const { OK } = require('http-status-codes')
const {
  User
} = require('../models')
const { format } = require('util')
const stream = require('stream')
const { DEFAULT_PAGINATION_LIMIT } = require('../../../shared/constants/common')

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const limit = (Object.getOwnPropertyDescriptor(req.query, 'limit') ? +req.query.limit : 20) || DEFAULT_PAGINATION_LIMIT
      const offset = Object.getOwnPropertyDescriptor(req.query, 'offset') ? + req.query.offset : 0
      const {rows: data, count} = await User.findAndCountAll({
        where: {},
        ...((Object.getOwnPropertyDescriptor(req.query, 'limit') ||
          Object.getOwnPropertyDescriptor(req.query, 'offset')) && {
          limit,
          offset
        }),
        order: [['name', 'DESC']],
      })
      res.status(OK).json({
        data,
        metaData: {
          count
        }
      })
    } catch(ex) {
      next(ex)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userId = +req.params.userId
      const user = await User.findByPk(userId)
      if(!user) {
        throw new Error(format(`user with id: %d, not found`, userId))
      }
      Object.assign(user, {
        ...req.body
      })
      await user.save()
      res.status(OK).json({
        data: user
      })
    } catch(ex) {
      console.log(ex)
      next(ex)
    }
  },
  exportUsers: async (req, res, next) => {
    try {
      const users = await User.findAll({
        order: [['name', 'DESC']],
      })
      const downloadColumns = [{
        accessor: 'name',
        title: 'Name'
      }, {
        accessor: 'email',
        title: 'Email'
      }, {
        accessor: 'gender',
        title: 'Gender'
      }, {
        accessor: 'status',
        title: 'Status'
      }, ]
      const csvHeaders = downloadColumns.map(({ title }) => title)
      const readStream = new stream.PassThrough()
      readStream.write(csvHeaders.join(',') + '\n') // write CSV header
      users.forEach(user => {
        readStream.write('\n')
        readStream.write(downloadColumns.map(({ accessor}) => user[accessor]).map(value => `"${value}"`).join(','))
      })
      readStream.end(null)
      res.set('Content-disposition', 'attachment; filename=gorest-users.csv')
      res.set('Content-Type', 'text/csv')
      readStream.pipe(res)
    } catch(ex) {
      next(ex)
    }
  }
}