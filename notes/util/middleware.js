const jwt = require('jsonwebtoken')

const { SECRET } = require('./config')

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: `referenced ${error.fields ?? error.index} does not exist` })
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  }

  else {
    return res.status(500).json({ error: error.message })
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}
