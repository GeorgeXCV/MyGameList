require('dotenv').config()

const PORT = process.env.PORT
const PG_HOST = process.env.PG_HOST
const PG_PORT = process.env.PG_PORT
const PG_DBNAME = process.env.PG_DBNAME
const PG_USER = process.env.PG_USER
const PG_PASSWORD = process.env.PG_PASSWORD
const JWT_SECRET = process.env.JWT_SECRET

export {
    PORT,
    PG_HOST,
    PG_PORT,
    PG_DBNAME,
    PG_USER,
    PG_PASSWORD,
    JWT_SECRET
}