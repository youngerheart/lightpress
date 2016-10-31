import Router from 'koa-router';
import send from 'koa-send';
import Config from '../controllers/config';
import Article from '../controllers/article';
import {setPage, isLogin} from '../controllers/admin';
import {renderPage, checkUrl} from '../services/tools';

const adminRouter = new Router();

adminRouter.get('/static/*', async (ctx) => {
  await send(ctx, ctx.url);
});

adminRouter.use(checkUrl, (ctx, next) => {
  ctx.type = 'text/html';
  return next();
});

adminRouter.redirect('/', '/article');
adminRouter.get('/init', Config.getForInit, setPage, renderPage);
adminRouter.use('/:moduleName', Config.get, setPage, isLogin);
adminRouter.use('/article', Article.list);
adminRouter.get('*', renderPage);

export default adminRouter;
