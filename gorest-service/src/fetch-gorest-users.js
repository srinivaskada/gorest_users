'use strict'

const { User } = require("./models")
const requestPromise = require('request-promise')
const { MALE, FEMALE, ACTIVE, INACTIVE } = require("../../shared/constants/common")

module.exports = async () => {
  const usersCount = await User.count()
  if(usersCount > 0) {
    return console.log('user data already updated')
  }
  await User.destroy({
    where: {},
    truncate: true
  })
  let currentPage=1
  while(true) {
    const response = await requestPromise({
      uri: `${process.env.GOREST_BASEURL}/users?page=${currentPage}&limit=20`,
      method: 'GET',
      json: true,
      headers: {
        Authorization: `Bearer ${process.env.GOREST_TOKEN}`
      }
    })
    const { data: users } = response

    if(users.length === 0) break
    await User.bulkCreate(users.map(({ id: goRestId, name, email, gender, status }) => ({
      goRestId,
      name,
      email,
      gender: [MALE, FEMALE].find(g => g.toLocaleLowerCase() === gender.toLocaleLowerCase()),
      status: [ACTIVE, INACTIVE].find(s => s.toLocaleLowerCase() === status.toLocaleLowerCase()),
    })))
    currentPage++
  }
}