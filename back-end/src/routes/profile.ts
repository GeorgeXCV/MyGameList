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

// Get game from user profile
profileRouter.get('/:game/:userID', async (ctx: Context) => {
    const game = ctx.params.game
    const userID  = ctx.params.userID

    if (!userID) {
        ctx.throw(400, 'User ID is required.')
    } else if (!game) {
        ctx.throw(400, 'Game is required.')
    }

   const findGameQuery = `
        select json_agg(users_games.*) as game
        from users_games
        where game_id = $1
        and user_id = $2
    `

    const { rows } = await query(findGameQuery, [game, userID]);
    // If empty list return null so no game status is set
    if (rows.length === 0 || rows[0].game === null) {
        ctx.body = null
    } else {
        ctx.body = rows[0].game[0]
    }
});

// Add game to user backlog
profileRouter.post('/backlog', async (ctx: Context) => {
    const { gameID, userID } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    }

    const addBacklogQuery = `
        insert into users_games (game_id, user_id, status, platform) values ($1, $2, 'Backlog', 'Any')
        on conflict (game_id, user_id) do update 
        set status = 'Backlog'
        returning *
    `
    const { rows } = await query(addBacklogQuery, [gameID, userID]);
    ctx.body = rows
});

// Add game to user playing
profileRouter.post('/playing', async (ctx: Context) => {
    const { gameID, userID, platform, date } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    } else if (!platform) {
        ctx.throw(400, 'Platform is required.')
    } else if (!date) {
        ctx.throw(400, 'Date is required.')
    }

    const addPlayingQuery = `
        insert into users_games (game_id, user_id, status, platform, "startDate") values ($1, $2, 'Playing', $3, $4)
        on conflict (game_id, user_id) do update 
        set status = 'Playing', platform = $3, "startDate" = $4
        returning *
    `

    const { rows } = await query(addPlayingQuery, [gameID, userID, platform, date]);
    ctx.body = rows
});

// Delete game from user profile
profileRouter.delete('/game', async (ctx: Context) => {
    const {gameID, userID} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'Username is required.')
    }

    const deleteGameQuery = ` delete from users_games where game_id = $1 and user_id = $2; `

    const { rows } = await query(deleteGameQuery, [gameID, userID])
    ctx.body = rows
})


profileRouter.get('/games/:username', async (ctx: Context) => {
    const username  = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const findgamesQuery = `select games from users where username = $1`
    const { rows } = await query(findgamesQuery, [username]);
    ctx.body = rows
});

export default profileRouter;