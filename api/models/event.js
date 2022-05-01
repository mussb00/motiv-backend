const db = require('../dbConfig/postgres');
const mongoose = require('mongoose')
require('dotenv').config()

const greeting = (req, res) => {
    res.send('hello all')
}

// mongoose version
const createEvent = async (req, res) => {
    await mongoose.connect(process.env.CONNECTION_URL)
    console.log('connection established ...')
    const eventDetails = req.body;
    console.log(eventDetails)
    const newEvent = await Event.create(eventDetails);
    await User.updateMany({ '_id': newEvent.users }, { $push: { events: newEvent._id } });
    return res.status(201).send(newEvent);
}

// pg version
const createEventpg = async (req, res) => {
    try {
        const eventDetails = req.body
        console.log(eventDetails)
        const newEvent = await db.query(`INSERT INTO Event
        (date, motive) VALUES ($1, $2) RETURNING *;`, [eventDetails.date, eventDetails.motive])
        console.log('we\'re connected')
        res.status(201).send(newEvent)
    } catch (err) {
        console.log(err)
    }
}

const deleteEvent = async (req, res) => {
    await mongoose.connect(process.env.CONNECTION_URL)
    console.log('connection established ...')
    const _id = req.params.id;
    console.log(_id)
    const event = await Event.findOne({ _id });
    console.log(event)
    await event.remove();
    await User.updateMany({ '_id': event.categories }, { $pull: { events: event._id } });
    return res.status(200).send(event);
}



module.exports = { greeting, createEvent, deleteEvent, createEventpg }