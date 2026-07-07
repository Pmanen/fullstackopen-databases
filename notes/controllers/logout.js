const router = require('express').Router()
const { sessionAuth } = require('../util/middleware')
const User = require('../models/user')
const Session = require('../models/session')

router.delete('/', sessionAuth, async (req, res, next) => {
  try {
    await Session.destroy({ where: { userId: req.user.id }})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
