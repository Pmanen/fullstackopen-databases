const router = require('express').Router()
const { sequelize } = require('../util/db')
const { Blog, User } = require('../models')

router.post('/', async (req, res) => {
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })
  await sequelize.sync({ force: true })
  res.status(204).end()
})

module.exports = router
