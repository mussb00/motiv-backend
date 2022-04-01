const { Pool } = require('pg')
const { RDS } = require('aws-sdk')
require('dotenv').config()

const signerOptions = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
    hostname: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
}

const signer = new RDS.Signer()
const getPassword = () => signer.getAuthToken(signerOptions)
const pool = new Pool({
    host: signerOptions.hostname,
    port: signerOptions.port,
    user: signerOptions.username,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})
console.log(signerOptions.region)
module.exports = pool;