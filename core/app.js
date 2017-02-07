import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import router from './router';
import {renderErrorPage} from './services/tools';
import {dbUri, dbOptions, serverPort} from './config';

const app = new Koa();

mongoose.connect(dbUri || 'mongodb://127.0.0.1:27017/lightpress', dbOptions || {});

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

app.listen(serverPort, () => {
  process.stderr.write(`Server running at http://localhost:${serverPort}\n`);
});
