import Router from 'koa-router';
import send from 'koa-send';
import Config from './../controllers/config';
import Common from '../controllers/common';
import {renderPage, checkUrl} from './../services/tools';
import {setPage} from './../controllers';
import apiRouter from './api';
import adminRouter from './admin';

const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/admin', adminRouter.routes());

router.redirect('/', '/article');
router.redirect('/favicon.ico', '/static/favicon.ico');

router.use('*', Config.get);

router.get('/static/*', async (ctx) => {
  await send(ctx, `/themes/${ctx._lg.config.theme}${ctx.url}`);
});

router.use('/:moduleName', checkUrl, (ctx, next) => {
  ctx.type = 'text/html';
  ctx._lg.moduleName = ctx.params.moduleName;
  return next();
}, setPage);

router.use('/article', Common.list, Common.extraCount, Common.extraAggregate);
router.use('/article/:id', Common.get, Common.extraArticle);
router.get('*', renderPage);

export default router;
