import Router from 'koa-router';
import send from 'koa-send';
import Config from './../controllers/config';
import Common from '../controllers/common';
import {renderPage, checkUrl} from './../services/tools';
import {baseUrl, countUrl, singleUrl} from '../services/args';
import {setPage} from './../controllers';
import apiRouter from './api';
import adminRouter from './admin';

const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/admin', adminRouter.routes());

router.get('/static/*', async (ctx) => {
  await send(ctx, `/themes/${ctx._lg.config.theme}${ctx.url}`);
});

router.use('/:moduleName', checkUrl, (ctx, next) => {
  ctx.type = 'text/html';
  ctx._lg.moduleName = ctx.params.moduleName;
  return next();
});

router.redirect('/', '/articles');
router.use('*', Config.get, setPage);
adminRouter.use(baseUrl, Common.list);
adminRouter.use(countUrl, Common.count);
adminRouter.use(singleUrl, Common.get);
router.get('*', renderPage);

export default router;
