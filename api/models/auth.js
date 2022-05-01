require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

// postgres
const db = require('../dbConfig/postgres');

// postgres login 
const login = async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await db.query(`SELECT * FROM users WHERE users.email='${req.body.email}'`)
        console.log(user['rows'][0])
        console.log(user['rows'][0]['password'])
        if (!user) {
            res.status(404).json('No user with this email')
            return
        }
        const authed = await bcrypt.compare(req.body.password, `${user['rows'][0]['password']}`);
        console.log(authed)
        if (authed) {
            const payload = { name: user['rows'][0].username, email: user['rows'][0].email }
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
        console.log(err)
        res.status(500).json({ err });
    }
}

// postgres register
const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        const username = req.body.username
        const email = req.body.email;

        console.log(req.body.username, req.body.email, hashed)

        // check user email not in use
        const user = await db.query(`SELECT email FROM users WHERE users.email='${req.body.email}'`)
        console.log(user)
        if (user['rowCount'] !== 0) {
            res.status(400).send('User with this email already exists')
            return
        }

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