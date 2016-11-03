import RestError from '../services/resterror';
import func from '../services/func';

export default {
  setPage(ctx, next) {
    var {_lg, __lg} = ctx;
    __lg.pagePath = `${__dirname}/../../admin/pages/`;
    __lg.xtplPath = `${__lg.pagePath}${func.getTpl(_lg.moduleName)}.xtpl`;
    return next();
  },
  isLogin(ctx, next) {
    var {config} = ctx.__lg;
    if (!config._id.equals(ctx.session.config)) {
      if (ctx.type === 'text/html' && ctx.url !== '/admin/login') ctx.redirect('/admin/login');
      else if (ctx.type !== 'text/html' && ctx.url !== '/api/login') throw new RestError(401, 'LOGIN_REQUIRED_ERR', 'you are not login');
    } else {
      ctx._lg.config.isLogin = true;
      if (ctx.type === 'text/html' && ctx.url === '/admin/login') ctx.redirect('/admin/article');
      else if (ctx.type !== 'text/html' && ctx.url === '/api/login') throw new RestError(400, 'LOGIN_ALLREADY_ERR', 'you are already logined');
    }
    return next();
  },
  login(ctx, next) {
    var {config} = ctx.__lg;
    var {password} = ctx.req.body;
    if (config.password !== password) throw new RestError(400, 'LOGIN_FAILED_ERR', 'password is wrong');
    ctx.session.config = config._id;
    ctx.status = 204;
  }
};

