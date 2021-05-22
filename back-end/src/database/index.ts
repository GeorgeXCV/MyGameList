const { Pool } = require('pg');
import { PG_HOST, PG_PORT, PG_DBNAME, PG_USER, PG_PASSWORD} from '../utils/config'

const dbConfig = new Pool({
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DBNAME,
  user: PG_USER,
  password: PG_PASSWORD,
})

module.exports = {
  query: (text: String, params: any) => {
    return dbConfig.query(text, params)
  }
}

