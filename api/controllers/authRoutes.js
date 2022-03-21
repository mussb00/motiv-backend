const express = require('express')
const router = express.Router()
router.use(express.json())
const { register, login } = require('../models/auth')

// login
router.post('/login', login)
// registration
router.post('/register', register)

module.exports = router