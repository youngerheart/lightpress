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
      var {blogName, blogDesc, totalTheme} = config;
      ctx.__lg.config = config;
      ctx._lg.config = {theme: totalTheme.name, blogName, blogDesc};
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
    config = new Config(params);
    await config.save();
    ctx.body = {_id: config._id};
  }
};
