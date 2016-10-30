import Router from 'koa-router';
import send from 'koa-send';
import Config from './../controllers/config';
import Article from './../controllers/article';
import {renderPage} from './../services/tools';
import {setPage} from './../controllers';
import apiRouter from './api';
import adminRouter from './admin';

const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/admin', adminRouter.routes());

router.redirect('/', '/articles');
router.use('*', Config.get);
router.get('/static/*', async (ctx) => {
  await send(ctx, `/themes/${ctx._lg.config.theme}${ctx.url}`);
});
router.use('/:moduleName', setPage);
router.get('/articles', Article.get, renderPage);
router.get('*', renderPage);

export default router;
