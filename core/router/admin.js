import Router from 'koa-router';
import send from 'koa-send';
import Config from '../controllers/config';
import Common from '../controllers/common';
import {setPage, isLogin} from '../controllers/admin';
import {renderPage, checkUrl} from '../services/tools';
import {baseUrl, countUrl, singleUrl} from '../services/args';

const adminRouter = new Router();

adminRouter.get('/static/*', async (ctx) => {
  await send(ctx, ctx.url);
});

adminRouter.use('/:moduleName', checkUrl, (ctx, next) => {
  ctx.type = 'text/html';
  ctx._lg.moduleName = ctx.params.moduleName;
  return next();
});

adminRouter.redirect('/', '/admin/article');

adminRouter.get('/init', Config.getForInit, setPage, renderPage);

adminRouter.use('*', Config.get, setPage, isLogin);

adminRouter.use(baseUrl, Common.list, Common.extraCount, Common.extraAggregate);
adminRouter.use(countUrl, Common.count);
adminRouter.use(singleUrl, Common.get);

adminRouter.get('*', renderPage);

export default adminRouter;
