import { Pool } from 'pg'
import { PG_HOST, PG_PORT, PG_DBNAME, PG_USER, PG_PASSWORD} from '../utils/config'

const dbConfig = new Pool({
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DBNAME,
  user: PG_USER,
  password: PG_PASSWORD,
})

const query = (text: string, params: any) => {
  return dbConfig.query(text, params)
}

export {
  query
}

