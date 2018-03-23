import Router from 'koa-router';
import RestError from '../services/resterror';
import Admin from '../controllers/admin';
import Config from '../controllers/config';
import Theme from '../controllers/theme';
import Common from '../controllers/common';
import {renderAPI, checkUrl, setIP} from '../services/tools';
import {baseUrl, countUrl, singleUrl} from '../services/args';

const apiRouter = new Router();

apiRouter.use('/:moduleName', checkUrl, (ctx, next) => {
  ctx.type = 'json';
  ctx._lg.moduleName = ctx.params.moduleName;
  return next();
});

apiRouter.post('/init', Theme.init, Config.init);
apiRouter.use(Config.get);

apiRouter.get(baseUrl, Common.list, renderAPI, Common.getAggregate);
apiRouter.get(countUrl, Common.count, renderAPI);
apiRouter.get(singleUrl, Common.get, renderAPI);

apiRouter.post('/resetpwmail', Admin.resetpwmail);
apiRouter.put('/resetpw/:token', Admin.checkToken, Config.resetpw);
apiRouter.post('/comment', setIP, Common.add, renderAPI);

apiRouter.use(Admin.isLogin);

apiRouter.post('/login', Admin.login);
apiRouter.get('/logout', Admin.logout);
apiRouter.put('/config', Config.set);
apiRouter.put('/password', Config.setPassword);
apiRouter.post(baseUrl, Common.add, renderAPI);
apiRouter.delete(singleUrl, Common.del, Common.extraDel, renderAPI);
apiRouter.put(singleUrl, Common.edit, renderAPI);

apiRouter.all('*', () => {
  throw new RestError(500, 'API_NOTFOUND_ERR', 'that API is not exist.');
});

export default apiRouter;
