const express = require('express')
const router = express.Router()
const greeting = require('../models/event')

router.get('/greeting', greeting)

module.exports = router