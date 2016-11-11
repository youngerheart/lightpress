import Koa from 'koa';
import mongoose from 'mongoose';
import session from 'koa-session';
import convert from 'koa-convert';
import parse from 'co-body';
import router from './router';
import {renderErrorPage} from './services/tools';
import {dbUri, dbOptions, serverPort} from './config';

const app = new Koa();

mongoose.Promise = Promise;
mongoose.connect(dbUri || 'mongodb://127.0.0.1:27017/lightpress', dbOptions || {});

app.keys = ['lightpress'];

app.use(convert(session(app)));

app.use(async (ctx, next) => {
  const start = new Date();
  try {
    // 直接解析出post参数, 这里的co-body 的 parse 总是有神奇的 bug
    var getBody = async () => {
      let type = ctx.headers['content-type'];
      if (type.indexOf('application/json') > -1)
        ctx.req.body = await parse.json(ctx) || {};
      else if (type.indexOf('application/x-www-from-urlencoded') > -1)
        ctx.req.body = await parse.form(ctx) || {};
      else ctx.req.body = await parse(ctx) || {};
    };
    if (ctx.method !== 'GET' && ctx.method !== 'OPTIONS') await getBody();
    ctx._lg = {
      config: {},
      extra: {}
    }; // public params for pages.
    ctx.__lg = {} // private params.
    if (!ctx.session) ctx.session = {};
    await next();
  } catch (err) {
    await renderErrorPage(ctx, err);
  }
  const ms = new Date() - start;
  process.stderr.write(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms\n`);
});

app.use(router.routes());

app.listen(serverPort, () => {
  process.stderr.write(`Server running at http://localhost:${serverPort}\n`);
});
