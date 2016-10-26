import Koa from 'koa';
import Router from 'koa-router';

import Config from './controllers/config';
import Article from './controllers/article'
import {renderPage} from './services/tools';

const router = new Router();

router.use('/:moduleName', Config.get);
router.get('/articles', Article.get, renderPage);

export default router;
