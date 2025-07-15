const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Bot = require('../models/Bot')

router.get('/', async (req, res) => {
  const user = req.session.user
  if (!user || !user.isAdmin) return res.status(403).send('Access Denied')

  const users = await User.findAll()
  const bots = await Bot.findAll({ include: User })

  res.render('admin', { users, bots })
})

module.exports = router
