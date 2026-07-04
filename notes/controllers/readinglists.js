const router = require('express').Router()

const { User, Note, ReadingList } = require('../models')

router.post('/', async (req, res) => {
  try {
    const readListItem = await ReadingList.create(
      {
        userId: req.body.userId,
        blogId: req.body.blogId,
      }
    )
    res.json(readListItem)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

module.exports = router
