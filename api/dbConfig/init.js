const mongoose = require('mongoose')

// user class
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashed_password: String,
})
const User = mongoose.model('User', userSchema)

// events
const eventSchema = new mongoose.Schema({
    username: String,
    email: String,
    // hashed_password:,
})
const Event = mongoose.model('Event', eventSchema)

module.exports = { User, Event }