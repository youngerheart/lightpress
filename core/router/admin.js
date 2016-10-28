import Router from 'koa-router';
import Config from './../controllers/config';
import Article from './../controllers/article';
import {renderPage} from './../services/tools';
import {setPage} from './../services/admin';

const adminRouter = new Router();

adminRouter.use('/:moduleName', Config.get, setPage);
adminRouter.get('/index', Article.get, renderPage);
adminRouter.get('*', renderPage);

export default adminRouter;
