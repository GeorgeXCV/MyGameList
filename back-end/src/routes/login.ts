import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'
import { query } from '../database/postgres-db'
import { Context } from "koa";
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser';

const loginRouter = new Router()
loginRouter.use(bodyParser())

loginRouter.post('/login', async (ctx: Context) => {
    const { username, password} = ctx.request.body

    if (!username || !password) {
        ctx.throw(400, 'Username and password are required.')
    }
    
    // Query Postgres
    const findUserQuery = `select * from users where username = $1`
    const { rows } = await query(findUserQuery, [username]);

    // Compare password to password hash
    const passwordIsCorrect = rows[0].password === null ? false : await bcrypt.compare(password, rows[0].password);

    if (!passwordIsCorrect) {
        ctx.throw(401, 'Invalid password.')
    }

    // Create token for user and return it
    const userForToken = {
        username: rows[0].username,
        id: rows[0].id
    }

    const token = jwt.sign(userForToken, JWT_SECRET)
    ctx.body = { token, username: username}
})

export default loginRouter;