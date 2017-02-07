import Router from 'koa-router';
import send from 'koa-send';
import Config from './../controllers/config';
import Article from './../controllers/article';
import {setPage} from './../controllers/admin';
import {renderPage} from './../services/tools';

const adminRouter = new Router();

adminRouter.get('/static/*', async (ctx) => {
  await send(ctx, ctx.url);
});

adminRouter.use('/:moduleName', Config.get, setPage);
adminRouter.get('/index', Article.get, renderPage);
adminRouter.get('*', renderPage);

export default adminRouter;
