import Router from 'koa-router';
import Config from './../controllers/config';
import Article from './../controllers/article';
import {renderPage} from './../services/tools';
import {setPage} from './../services';
import apiRouter from './api';
import adminRouter from './admin';

const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/admin', adminRouter.routes());

router.use('/:moduleName', Config.get, setPage);
router.get('/articles', Article.get, renderPage);
router.get('*', renderPage);

export default router;
