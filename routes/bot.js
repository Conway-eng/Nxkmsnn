const express = require('express')
const router = express.Router()
const Bot = require('../models/Bot')
const { deployBotToRender } = require('../utils/renderApi')

router.get('/create', (req, res) => {
  if (!req.session.user) return res.redirect('/login')
  res.render('bot-form')
})

router.post('/create', async (req, res) => {
  if (!req.session.user) return res.redirect('/login')

  const {
    appName, botName, sessionId, prefix,
    mode, ownerNumber, ownerName, chatbot
  } = req.body

  const bot = await Bot.create({
    owner: req.session.user._id,
    appName, botName, sessionId, prefix,
    mode, ownerNumber, ownerName,
    chatbot: chatbot === 'on'
  })

  await deployBotToRender(appName, {
    BOT_NAME: botName,
    SESSION_ID: sessionId,
    PREFIX: prefix,
    MODE: mode,
    OWNER_NUMBER: ownerNumber,
    OWNER_NAME: ownerName,
    CHATBOT: chatbot === 'on' ? 'true' : 'false'
  })

  res.redirect('/dashboard')
})

module.exports = router
