import RestError from '../services/resterror';
import Config from '../models/config';
// import Theme from '../models/theme';
import {getParams} from '../services/tools';

export default {
  async get(ctx, next) {
    var config = await Config.findOne({}).populate('totalTheme');
    if (!config) {
      if (ctx.type === 'html') ctx.redirect('/admin/init');
      else throw new RestError(400, 'CONFIG_NOTFOUND_ERR', 'config uninitialized');
    }
    var {blogName, blogDesc, totalTheme} = config;
    var {moduleName} = ctx.params;
    ctx.__lg.config = config;
    ctx._lg.config = {theme: totalTheme.name, moduleName, blogName, blogDesc};
    return next();
  },
  async getForInit(ctx, next) {
    var config = await Config.findOne({});
    if (config) ctx.redirect('/admin/article');
    ctx._lg.config = {moduleName: 'init'};
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
