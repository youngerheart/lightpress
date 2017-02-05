import Koa from 'koa';
import Router from 'koa-router';

import Routes from './apis/routers';

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  ctx.type = 'json';
  try {
    await next();
  } catch (err) {
    process.stderr.write(err.stack + '\n');
    let {status, name, message, errors} = err;
    ctx.status = status || 500;
    if (name) ctx.body = {name, message, errors};
    const ms = new Date() - start;
    process.stderr.write(`${ctx.method} ${ctx.url} - ${ms}ms\n`);
  }
});

app.use(Routes.routes());
