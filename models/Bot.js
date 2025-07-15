const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')
const User = require('./User')

const Bot = sequelize.define('Bot', {
  appName: DataTypes.STRING,
  botName: DataTypes.STRING,
  sessionId: DataTypes.STRING,
  prefix: DataTypes.STRING,
  mode: DataTypes.STRING,
  ownerNumber: DataTypes.STRING,
  ownerName: DataTypes.STRING,
  chatbot: DataTypes.BOOLEAN
})

User.hasMany(Bot, { foreignKey: 'ownerId' })
Bot.belongsTo(User, { foreignKey: 'ownerId' })

module.exports = Bot
