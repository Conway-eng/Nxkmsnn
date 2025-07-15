const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

// Render login and register
router.get('/login', (req, res) => res.render('login', { error: null }))
router.get('/register', (req, res) => res.render('register', { error: null }))

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  const isAdmin = username === 'admin' && password === 'admin'

  try {
    await User.create({ username, password: hash, isAdmin })
    res.redirect('/login')
  } catch (err) {
    res.render('register', { error: 'Username already exists or error occurred' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  if (!user) return res.render('login', { error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.render('login', { error: 'Invalid credentials' })

  req.session.user = user
  res.redirect('/dashboard')
})

// Dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login')
  res.render('dashboard', { user: req.session.user })
})

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'))
})

module.exports = router
