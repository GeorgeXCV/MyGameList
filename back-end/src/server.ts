const Koa =  require('koa')
const Router =  require('@koa/router')
const Logger = require('koa-logger')
import { PORT } from './utils/config'

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
 ctx.body = 'Hello World!';
});

app.use(async (ctx, next) => {
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

// Listen the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});