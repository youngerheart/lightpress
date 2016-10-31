import xtpl from 'xtpl';
import RestError from './resterror';

const Tool = {
  dealSchema() {},
  getParams(params, fields) {
    var newParams = {};
    fields.forEach((item) => {
      if (params[item] !== undefined) newParams[item] = params[item];
    });
    return newParams;
  },
  async renderPage(ctx) {
    var {_lg, __lg} = ctx;
    try {
      ctx.body = await new Promise((resolve, reject) => {
        xtpl.renderFile(__lg.xtplPath, _lg, function(error, content) {
          if (error) reject(error);
          else resolve(content);
        });
      });
    } catch (err) {
      throw new RestError(500, 'XTPL_ERROR', err);
    }
  },
  async renderErrorPage(ctx, err) {
    var {_lg, __lg} = ctx;
    try {
      ctx.body = await new Promise((resolve, reject) => {
        xtpl.renderFile(`${__lg.pagePath}/error.xtpl`, _lg, function(error, content) {
          if (error) reject(err);
          else resolve(content);
        });
      });
    } catch (err) {
      ctx.type = 'json';
      process.stderr.write(err.stack + '\n');
      let {status, name, message, errors} = err;
      ctx.status = status || 500;
      if (name) ctx.body = {name, message, errors};
    }
  },
  checkUrl(ctx, next) {
    if (ctx.url.split('.').length > 1) throw new RestError(403, 'REQUEST_INVALID_ERR');
    return next();
  }
};

export default Tool;
