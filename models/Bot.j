const mongoose = require('mongoose')

const BotSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appName: String,
  botName: String,
  sessionId: String,
  prefix: String,
  mode: String,
  ownerNumber: String,
  ownerName: String,
  chatbot: Boolean,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Bot', BotSchema)
