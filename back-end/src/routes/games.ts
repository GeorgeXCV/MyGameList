import { query } from '../database/postgres-db'
import { Context } from "koa";
import Router from '@koa/router'

const gamesRouter = new Router()

gamesRouter.get('/popular', async (ctx: Context) => {
    const findPopularGamesQuery = `select * from games ORDER BY playing DESC limit 5;`
    const { rows } = await query(findPopularGamesQuery, null);
    ctx.body = rows
})

gamesRouter.get('/popular-upcoming', async (ctx: Context) => {
    const findPopularUpcomingGamesQuery = `select * from games WHERE first_release_date > extract(epoch from now()) ORDER BY backlog DESC limit 5;`
    const { rows } = await query(findPopularUpcomingGamesQuery, null);
    ctx.body = rows
})

gamesRouter.get('/game/:id', async (ctx: Context) => {
    const game = ctx.params.id
    if (!game) {
        ctx.throw(400, 'Game ID parameter is required.')
    }
    const findGameQuery = `select * from games WHERE id = $1`
    const { rows } = await query(findGameQuery, [game]);
    if (!rows[0]) {
        ctx.throw(404, 'Game not found.')
    }
    ctx.body = rows[0]
})
export default gamesRouter;