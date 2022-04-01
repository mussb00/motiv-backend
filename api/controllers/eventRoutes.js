const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const { greeting, createEvent, deleteEvent, createEventpg } = require('../models/event')

router.get('/greeting', verifyToken, greeting)
router.post('/create', verifyToken, createEventpg)
router.delete('/delete/:id', verifyToken, deleteEvent)
module.exports = router