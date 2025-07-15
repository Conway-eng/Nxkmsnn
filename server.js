require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log(err))

// Routes
app.use('/', require('./routes/auth'))
app.use('/bot', require('./routes/bot'))
app.use('/admin', require('./routes/admin'))

app.get('/', (req, res) => res.render('index'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 HACKLINK TECH.INC running on http://localhost:${PORT}`))
