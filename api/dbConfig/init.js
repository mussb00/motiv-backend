const mongoose = require('mongoose')

// user
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    hashed_password: String,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
})
const User = mongoose.model('User', userSchema)

// events
const eventSchema = new mongoose.Schema({
    motive: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})
const Event = mongoose.model('Event', eventSchema)

module.exports = { User, Event }