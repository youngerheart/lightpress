import md5 from 'md5';
import rp from 'request-promise';
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
    if (config.password !== md5(password)) throw new RestError(400, 'LOGIN_FAILED_ERR', 'password is wrong');
    ctx.session.config = config._id;
    ctx.status = 204;
  },
  logout(ctx, next) {
    ctx.session.config = null;
    ctx.status = 204;
  },
  async resetpwmail(ctx, next) {
    var {email} = ctx.req.body;
    if (email !== ctx._lg.config.email) throw new RestError(400, 'PARAM_REQUIRED_ERR', 'email is wrong');
    var {token} = await rp({url: 'https://lightpress.timehub.cc/user/resetpwmail', method: 'POST', body: {origin: ctx.header.origin, email}, json: true});
    ctx.session.token = token;
    ctx.status = 204;
  },
  checkToken(ctx, next) {
    var {token} = ctx.params;
    ctx.session.config = null;
    if (token !== ctx.session.token) {
      if (ctx.type === 'text/html') ctx.redirect('/admin/login');
      else throw new RestError(400, 'TOKEN_REQUIRED_ERR', 'token is wrong');
    }
    return next();
  }
};

