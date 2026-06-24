const router = require('express').Router()
const { sequelize } = require('../util/db')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const authorBlogCount = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  })
  res.json(authorBlogCount)
})


module.exports = router
