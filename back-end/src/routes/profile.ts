import { query } from '../database/postgres-db'
import { Context } from "koa";
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser';

const profileRouter = new Router()
profileRouter.use(bodyParser())


profileRouter.get('/user/:username', async (ctx: Context) => {
    const username  = ctx.params.username

    if (!username) {
        ctx.throw(400, 'Username is required.')
    }

    const findUserQuery = `select * from users where username = $1`
    const { rows } = await query(findUserQuery, [username]);
    ctx.body = rows
});

profileRouter.get('/games/:userid', async (ctx: Context) => {
    const userID  = ctx.params.userid

    if (!userID) {
        ctx.throw(400, 'User ID is required.')
    }

    const findUserGamesQuery = `select * from users_games where user_id = $1`
    const { rows } = await query(findUserGamesQuery, [userID]);
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

// Add game to user played
profileRouter.post('/played', async (ctx: Context) => {
    const { gameID, userID, platform, startDate, endDate } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    } else if (!platform) {
        ctx.throw(400, 'Platform is required.')
    } else if (!startDate) {
        ctx.throw(400, 'Start Date is required.')
    } else if (!endDate) {
        ctx.throw(400, 'End Date is required.')
    }

    const addPlayingQuery = `
        insert into users_games (game_id, user_id, status, platform, "startDate", "endDate") values ($1, $2, 'Played', $3, $4, $5)
        on conflict (game_id, user_id) do update 
        set status = 'Played', platform = $3, "startDate" = $4, "endDate" = $5
        returning *
    `

    const { rows } = await query(addPlayingQuery, [gameID, userID, platform, startDate, endDate]);
    ctx.body = rows
});

// Add game to user dropped
profileRouter.post('/dropped', async (ctx: Context) => {
    const { gameID, userID, platform, startDate, endDate } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    } else if (!platform) {
        ctx.throw(400, 'Platform is required.')
    } else if (!startDate) {
        ctx.throw(400, 'Start Date is required.')
    } else if (!endDate) {
        ctx.throw(400, 'End Date is required.')
    }

    const addPlayingQuery = `
        insert into users_games (game_id, user_id, status, platform, "startDate", "endDate") values ($1, $2, 'Dropped', $3, $4, $5)
        on conflict (game_id, user_id) do update 
        set status = 'Dropped', platform = $3, "startDate" = $4, "endDate" = $5
        returning *
    `

    const { rows } = await query(addPlayingQuery, [gameID, userID, platform, startDate, endDate]);
    ctx.body = rows
});

// Add or remove game to favourite
profileRouter.post('/favourite', async (ctx: Context) => {
    const { gameID, userID, favourite } = ctx.request.body

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    }

    const addFavouriteQuery = `
        insert into users_games (game_id, user_id, favourite) values ($1, $2, $3)
        on conflict (game_id, user_id) do update 
        set favourite = $3
        returning *
    `

    const { rows } = await query(addFavouriteQuery, [gameID, userID, favourite]);
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

// Rate a game
profileRouter.post('/rating', async (ctx: Context) => {
    const {gameID, userID, rating} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'Username is required.')
    }

    const rateGameQuery = ` 
        insert into users_games (game_id, user_id, rating) values ($1, $2, $3)
        on conflict (game_id, user_id) do update 
        set rating = $3
        returning *
    `

    const { rows } = await query(rateGameQuery, [gameID, userID, rating])
    ctx.body = rows
})

// Review a game
profileRouter.post('/review', async (ctx: Context) => {
    const {gameID, userID, username, platform, review, rating} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    } else if (!username) {
        ctx.throw(400, 'Username is required.')
    } else if (!platform) {
        ctx.throw(400, 'Platform is required.')
    }  else if (!review) {
        ctx.throw(400, 'Review is required.')
    } else if (!rating) {
        ctx.throw(400, 'Rating is required.')
    }

    const rateGameQuery = ` 
        insert into reviews (game_id, user_id, username, platform, review, rating, date) values ($1, $2, $3, $4, $5, $6, now())
        on conflict (game_id, user_id) do update 
        set platform = $4, review = $5, rating = $6
        returning *
    `

    const { rows } = await query(rateGameQuery, [gameID, userID, username, platform, review, rating])
    ctx.body = rows
})

// Delete review
profileRouter.delete('/review', async (ctx: Context) => {
    const {gameID, userID} = ctx.request.body 

    if (!gameID) {
        ctx.throw(400, 'Game ID is required.')
    } else if (!userID) {
        ctx.throw(400, 'User ID is required.')
    }

    const deleteGameQuery = ` delete from reviews where game_id = $1 and user_id = $2; `

    const { rows } = await query(deleteGameQuery, [gameID, userID])
    ctx.body = rows
})

export default profileRouter;