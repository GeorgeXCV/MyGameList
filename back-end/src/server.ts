import Koa, { Context, Next } from 'koa';
import cors from '@koa/cors'
import Router from '@koa/router';
import Logger from 'koa-logger';
import { PORT } from './utils/config';
import signUpRouter from './routes/signup'
import loginRouter from './routes/login';
import gamesRouter from './routes/games'
import profileRouter from './routes/profile';

const app = new Koa();
app.use(cors());
const router = new Router();

app.use(async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

// Development logging
app.use(Logger());
// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());
app.use(signUpRouter.routes())
app.use(loginRouter.routes());
app.use(gamesRouter.routes());
app.use(profileRouter.routes());

// Listen the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});