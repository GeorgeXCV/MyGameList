require('dotenv').config()
const { Pool } = require('pg');

const dbConfig = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DBNAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})

module.exports = {
  query: (text: String, params: any) => {
    return dbConfig.query(text, params)
  }
}

