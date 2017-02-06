import Koa from 'koa';
import Router from 'koa-router';

import router from './router';
import {renderErrorPage} from './services/tools';

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  ctx._lg = {}; // public params for pages.
  ctx.__lg = {} // private params.
  try {
    await next();
  } catch (err) {
    await renderErrorPage(ctx, err);
  }
  const ms = new Date() - start;
  process.stderr.write(`${ctx.method} ${ctx.url} - ${ms}ms\n`);
});

app.use(router.routes());

app.listen(3000, () => {
  process.stderr.write(`Server running at http://localhost:3000\n`);
});
