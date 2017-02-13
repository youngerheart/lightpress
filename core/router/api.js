import Router from 'koa-router';
import RestError from '../services/resterror';
import Admin from '../controllers/admin';
import Config from '../controllers/config';
import Theme from '../controllers/theme';
import Common from '../controllers/common';
import {renderAPI, checkUrl} from '../services/tools';
import {baseUrl, countUrl, singleUrl} from '../services/args';

const apiRouter = new Router();

apiRouter.use('/:moduleName', checkUrl, (ctx, next) => {
  ctx.type = 'json';
  ctx._lg.moduleName = ctx.params.moduleName;
  return next();
});

apiRouter.post('/init', Theme.init, Config.init);
apiRouter.use(Config.get, Admin.isLogin);
apiRouter.post('/login', Admin.login);

apiRouter.post(singleUrl, Common.add, renderAPI);
apiRouter.delete(singleUrl, Common.del, renderAPI);
apiRouter.put(singleUrl, Common.edit, renderAPI);
apiRouter.get(baseUrl, Common.list, renderAPI);
apiRouter.get(countUrl, Common.count, renderAPI);
apiRouter.get(singleUrl, Common.get, renderAPI);

apiRouter.all('*', () => {
  throw new RestError(500, 'API_NOTFOUND_ERR', 'that API is not exist.');
});

export default apiRouter;
