const bcrypt = require('bcrypt')
const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const whereReadingList = {}
  if (req.query.read) {
    whereReadingList.read = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      as: 'blogs',
      attributes: { exclude: ['userId'] }
    },
      {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'],
          where: whereReadingList
        },
    }]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { password, ...rest } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ ...rest, passwordHash })
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
      await user.update({ name: req.body.name ? req.body.name : user.name })
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

module.exports = router
