const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model { }

Session.init({
  id: {
    type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
  sequelize,
  underscored: true,
  modelName: 'session',
  timestamps: true
})

module.exports = Session
