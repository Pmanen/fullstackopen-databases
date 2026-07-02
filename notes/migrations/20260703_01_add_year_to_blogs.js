const { DataTypes, Op } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    await queryInterface.addConstraint('blogs', {
      fields: ['year'],
      type: 'check',
      name: 'year_range_check',
      where: {
        year: {
          [Op.gte]: 1991,
          [Op.lte]: new Date().getFullYear(),
        },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('blogs', 'year_range_check')
    await queryInterface.removeColumn('blogs', 'year')
  },
}
