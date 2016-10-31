import Router from 'koa-router';
import RestError from '../services/resterror';
import Admin from '../controllers/admin';
import Config from '../controllers/config';
import Theme from '../controllers/theme';
import {checkUrl} from '../services/tools';

const apiRouter = new Router();

apiRouter.use(checkUrl, (ctx, next) => {
  ctx.type = 'json';
  return next();
});

apiRouter.post('/init', Theme.init, Config.init);
apiRouter.use(Config.get, Admin.isLogin);
apiRouter.post('/login', Admin.login);
apiRouter.all('*', () => {
  throw new RestError(500, 'API_NOTFOUND_ERR', 'that API is not exist.');
});

export default apiRouter;
