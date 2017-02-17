import md5 from 'md5';
import RestError from '../services/resterror';
import Config from '../models/config';
// import Theme from '../models/theme';
import {getParams} from '../services/tools';

export default {
  async get(ctx, next) {
    var config = await Config.findOne({}).populate('totalTheme');
    if (!config) {
      if (ctx.type === 'text/html') ctx.redirect('/admin/init');
      else throw new RestError(400, 'CONFIG_NOTFOUND_ERR', 'config uninitialized');
    } else {
      var {blogName, blogDesc, totalTheme, email} = config;
      ctx.__lg.config = config;
      ctx._lg.config = {theme: totalTheme.name, blogName, blogDesc, email};
      return next();
    }
  },
  async getForInit(ctx, next) {
    var config = await Config.findOne({});
    if (config) ctx.redirect('/admin/article');
    return next();
  },
  async init(ctx) {
    var config = await Config.findOne({});
    if (config) throw new RestError(400, 'CONFIG_EXIST_ERR', 'config already initialized');
    var {theme} = ctx.__lg;
    var params = getParams(ctx.req.body, ['blogName', 'blogDesc', 'password', 'email']);
    params.totalTheme = theme._id;
    params.password = md5(params.password);
    config = new Config(params);
    await config.save();
    ctx.body = {_id: config._id};
  },
  async set(ctx) {
    var params = getParams(ctx.req.body, ['blogName', 'blogDesc', 'email']);
    await Config.update({}, params);
    ctx.status = 204;
  },
  async setPassword(ctx) {
    var {password} = ctx.__lg.config;
    var params = getParams(ctx.req.body, ['password', 'newPassword']);
    if (params.password === params.newPassword) throw new RestError(400, 'CONFIG_FAILED_ERR', 'password should be different');
    if (password !== md5(params.password)) throw new RestError(400, 'CONFIG_FAILED_ERR', 'password is wrong');
    await Config.update({}, {password: md5(params.newPassword)});
    ctx.session.config = null;
    ctx.status = 204;
  }
};
