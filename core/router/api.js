import Router from 'koa-router';
import RestError from './../services/resterror';

const apiRouter = new Router();

apiRouter.all('*', () => {
  throw new RestError(500, 'API_NOTFOUND_ERR', 'that API is not exist.');
});

export default apiRouter;
