const express = require('express')
const app = express()
const userRoutes = require('./api/controllers/userRoutes')
const eventRoutes = require('./api/controllers/eventRoutes')
// middleware
app.use(express.json())
app.use('/event', eventRoutes)
// app.use('/user', userRoutes)

module.exports = app