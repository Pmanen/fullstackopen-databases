const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL } = require('./config')

const isTestEnvironment = process.env.TESTING === 'true'
const sequelize = new Sequelize(isTestEnvironment ? TEST_DATABASE_URL : DATABASE_URL, {})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err.message)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }
