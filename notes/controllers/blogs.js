const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { sessionAuth } = require('../util/middleware')

router.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    }
  }
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', sessionAuth, async (req, res, next) => {
  try {
    const blog = await Blog.create({... req.body, userId: req.user.id })
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    return res.status(404).end()
  }
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  res.json(req.blog)
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', sessionAuth, blogFinder, async (req, res, next) => {
  try {
    if (req.user.id !== req.blog.userId) {
      return res.status(401).json({ error: 'not authorized' })
    }
    await req.blog.destroy()
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

module.exports = router
