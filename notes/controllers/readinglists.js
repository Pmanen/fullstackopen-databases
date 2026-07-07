const router = require('express').Router()

const { User, Note, ReadingList } = require('../models')
const { sessionAuth } = require('../util/middleware')

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

router.put('/:id', sessionAuth, async (req, res, next) => {
  try {
    const readListItem = await ReadingList.findByPk(req.params.id)
    if (!readListItem) {
      return res.status(404).json({ error: 'Reading list item not found' })
    }
    if (req.user.id !== readListItem.userId) {
      return res.status(401).json({ error: 'Not authorized to update this reading list item' })
    }
    if (req.body.read !== true) {
      return res.status(400).json({ error: 'Need to send requests to this route with field: read and value: true'})
    }
    await readListItem.update({
      read: true,
    })
    res.json(readListItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
