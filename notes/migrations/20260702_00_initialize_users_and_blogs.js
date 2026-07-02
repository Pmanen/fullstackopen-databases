const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
        },
      password_hash: {
          type: DataTypes.STRING,
          allowNull: false
        },
    })
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      author: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      url: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      }
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  }
}
