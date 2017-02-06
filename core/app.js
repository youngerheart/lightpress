import Koa from 'koa';
import Router from 'koa-router';

import router from './router';

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  ctx._lg = {};
  try {
    await next();
  } catch (err) {
    ctx.type = 'json';
    process.stderr.write(err.stack + '\n');
    let {status, name, message, errors} = err;
    ctx.status = status || 500;
    if (name) ctx.body = {name, message, errors};
    const ms = new Date() - start;
    process.stderr.write(`${ctx.method} ${ctx.url} - ${ms}ms\n`);
  }
});

app.use(router.routes());

app.listen(3000, () => {
  process.stderr.write(`Server running at http://localhost:3000\n`);
});
