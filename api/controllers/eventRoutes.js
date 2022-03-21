const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const greeting = require('../models/event')

router.get('/greeting', verifyToken, greeting)

module.exports = router