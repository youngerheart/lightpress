import Router from 'koa-router';
import RestError from './../services/resterror';
import Config from './../controllers/config';

const apiRouter = new Router();

apiRouter.use('/:moduleName', Config.get);
apiRouter.all('*', () => {
  throw new RestError(500, 'API_NOTFOUND_ERR', 'that API is not exist.');
});

export default apiRouter;
