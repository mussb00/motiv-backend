const express = require('express')
const app = express()
const userRoutes = require('./api/controllers/userRoutes')
const eventRoutes = require('./api/controllers/eventRoutes')
const authRoutes = require('./api/controllers/authRoutes')
// middleware
app.use(express.json())
app.use('/event', eventRoutes)
// app.use('/user', userRoutes)
app.use('/auth', authRoutes)

module.exports = app