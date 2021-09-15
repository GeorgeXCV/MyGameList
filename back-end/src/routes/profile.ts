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

    const backlogEntry = JSON.stringify({game: gameID, platform: "Any", status: "Backlog"})

    const addBacklogQuery = `
        update users
        set games = coalesce(games, '[]')::jsonb || $1::jsonb
        where username = $2
        returning *
    `
    const { rows } = await query(addBacklogQuery, [backlogEntry, username]);
    ctx.body = rows
});


profileRouter.post('/playing', async (ctx: Context) => {
    const { gameID, platform, date, username } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!platform) {
        ctx.throw(400, 'Platform is required.')
    } else if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const gameEntry = JSON.stringify({game: gameID, platform: platform, startDate: date || new Date(), status: "Playing"})
    const addPlayingQuery = `
        update users
        set games = coalesce(games, '[]')::jsonb || $1::jsonb
        where username = $2
        returning *
    `
    const { rows } = await query(addPlayingQuery, [gameEntry, username]);
    ctx.body = rows
});


profileRouter.get('/games/:username', async (ctx: Context) => {
    const username  = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const findgamesQuery = `select games from users where username = $1`
    const { rows } = await query(findgamesQuery, [username]);
    ctx.body = rows
});

profileRouter.get('/:game/:username', async (ctx: Context) => {
    const game = ctx.params.game
    const username  = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    } else if (!game) {
        ctx.throw(400, 'Game is required.')
    }

   const gameObj = [{
        "game": game
    }];
   const gameParam = JSON.stringify(gameObj);
   // Will only return column if contains that game
   const findGameQuery = `
        select games
        from users
        where username = $1
        and games @> $2
    `

    const { rows } = await query(findGameQuery, [username, gameParam]);
    // Only return the matching game instead of the whole list
    const result = rows[0].games.find(index => index.game === game);
    ctx.body = result
});

profileRouter.delete('/game', async (ctx: Context) => {
    const {gameID, username} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const deleteGameQuery = ` 
        update users 
        set games = games - $1
        where username = $2
    `

    const { rows } = await query(deleteGameQuery, [gameID, username]);
    ctx.body = rows;
})

export default profileRouter;