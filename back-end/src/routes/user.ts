import bcrypt from 'bcrypt'
import { query } from '../database/postgres-db'
import { Context } from "koa";
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser';

const userRouter = new Router()
userRouter.use(bodyParser())

userRouter.post('/user', async (ctx: Context) => {
    const { username, email, password} = ctx.request.body

    if (!username) {
        ctx.throw(400, 'Username is required')
    }

    if (!email) {
        ctx.throw(400, 'Email is required')
    }

    if (!password) {
        ctx.throw(400, 'Password is required')
    }

    try {
        // Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Insert user into database
        const createUserQuery = `
        insert into users(username, email, password)
        values($1, $2, $3)
        returning *
        `
        const user = await query(createUserQuery, [username, email, hashedPassword])
        // Return user
        ctx.body = user;    
    } catch (error) {
        ctx.throw(`Error registering user. Error: ${error}`)
    }
})

export default userRouter;