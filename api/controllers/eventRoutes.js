const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const { greeting, createEvent, deleteEvent } = require('../models/event')

router.get('/greeting', verifyToken, greeting)
router.post('/create', verifyToken, createEvent)
router.delete('/delete/:id', verifyToken, deleteEvent)
module.exports = router