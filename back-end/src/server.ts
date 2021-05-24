import Koa, { Context, Next } from 'koa';
import Router from '@koa/router';
import Logger from 'koa-logger';
import { PORT } from './utils/config';
import userRouter from './routes/user'
import loginRouter from './routes/login';

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Context) => {
 ctx.body = 'Hello World!';
});

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
app.use(userRouter.routes())
app.use(loginRouter.routes());

// Listen the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});