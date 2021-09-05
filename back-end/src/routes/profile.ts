import { query } from '../database/postgres-db'
import { Context } from "koa";
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser';

const profileRouter = new Router()
profileRouter.use(bodyParser())

profileRouter.get('/:username', async (ctx: Context) => {
    const username = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const findUserBacklogQuery = `select username, backlog from users where username = $1`
    const { rows } = await query(findUserBacklogQuery, [username]);
    ctx.body = rows
});

profileRouter.post('/backlog', async (ctx: Context) => {
    const { gameID, username } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const addBacklogQuery = `
        insert into backlog(username, game, date)
        values($1, $2, current_timestamp)
        returning *
    `

    // const currentDateTime = Date.now();
    const { rows } = await query(addBacklogQuery, [username, gameID]);
    ctx.body = rows
});

profileRouter.delete('/backlog', async (ctx: Context) => {
    const {gameID, username} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const deleteBacklogQuery = ` 
        delete from backlog where game = $1 and username = $2
    `

    const { rows } = await query(deleteBacklogQuery, [gameID, username]);
    ctx.body = rows;
})

profileRouter.get('/backlog/:username', async (ctx: Context) => {
    const username  = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const findUserBacklogQuery = `select * from backlog where username = $1`
    const { rows } = await query(findUserBacklogQuery, [username]);
    ctx.body = rows
});

export default profileRouter;