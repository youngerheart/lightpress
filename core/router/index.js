import Router from 'koa-router';
import send from 'koa-send';
import Config from './../controllers/config';
import Article from './../controllers/article';
import {renderPage, checkUrl} from './../services/tools';
import {setPage} from './../controllers';
import apiRouter from './api';
import adminRouter from './admin';

const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/admin', adminRouter.routes());

router.get('/static/*', async (ctx) => {
  await send(ctx, `/themes/${ctx._lg.config.theme}${ctx.url}`);
});

router.use(checkUrl, (ctx, next) => {
  ctx.type = 'text/html';
  return next();
});

router.redirect('/', '/articles');
router.use('*', Config.get);

router.use('/:moduleName', setPage);
router.get('/article', Article.list, renderPage);
router.get('*', renderPage);

export default router;
