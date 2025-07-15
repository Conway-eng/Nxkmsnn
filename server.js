require('dotenv').config()
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const { sequelize } = require('./models')
const path = require('path')
const { Pool } = require('pg')

const app = express()

// Pool for session storage
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(session({
  store: new pgSession({ pool: pgPool }),
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Sync DB
sequelize.sync().then(() => {
  console.log('✅ PostgreSQL connected and synced')
})

// Routes
app.use('/', require('./routes/auth'))
app.use('/bot', require('./routes/bot'))
app.use('/admin', require('./routes/admin'))

app.get('/', (req, res) => res.render('index'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 HACKLINK TECH.INC on http://localhost:${PORT}`))
