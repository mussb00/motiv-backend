const { User } = require('../dbConfig/init')
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');


// postgres
const db = require('../dbConfig/postgres');

// login
const login = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log('connection estabilished ...')
        const user = await User.find({ email: req.body.email })
        if (!user[0]) {
            res.status(404).json('No user with this email')
            return
        }
        const authed = await bcrypt.compare(req.body.password, user[0].hashed_password);
        console.log(authed)
        if (authed) {
            const payload = { name: user[0].username, email: user[0].email }
            const sendToken = (err, token) => {
                if (err) { throw new Error('Error in token generation') }
                console.log(token)
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, sendToken)
            console.log('hello') // access token formed from payload and token secret (user-specific) and sent to front end where it is stored in local storage
        }
    } catch (err) {
        res.status(500).json({ err });
    }
}

// postgres login 

// register
// const register = async (req, res) => {
//     try {

//         await mongoose.connect(process.env.CONNECTION_URL)
//         console.log('connection estabilished....')
//         const salt = await bcrypt.genSalt();
//         const hashed = await bcrypt.hash(req.body.password, salt);
//         const username = req.body.username
//         const email = req.body.email;

//         // check user email not in use
//         const user = await User.find({ email: req.body.email })
//         console.log(user[0])
//         if (user[0]) {
//             res.status(400).send('User with this email already exists')
//             return
//         }

//         const newUser = new User({
//             username: username,
//             email: email,
//             hashed_password: hashed
//         })
//         console.log(newUser)
//         await newUser.save()
//         res.status(201).json('New user successfully created!')
//     } catch (err) {
//         res.status(500).json({ err });
//     }
// }

// postgres register
const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const username = req.body.username
        const email = req.body.email;

        console.log(req.body.username, req.body.email, hashed)

        // check user email not in use
        // const user = await db.query(`SELECT 2 FROM User WHERE email = ${req.body.email}`)
        // console.log(user[0])
        // if (user) {
        //     res.status(400).send('User with this email already exists')
        //     return
        // }

        const newUser = await db.query(`INSERT INTO Users
        (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`, [uuidv4(), req.body.username, req.body.email, hashed])
        console.log('we\'re connected')
        res.status(201).send(newUser)

        console.log(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err });
    }
}

module.exports = { register, login }