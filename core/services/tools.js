import xtpl from 'xtpl';
import RestError from './resterror';

const Tool = {
  dealSchema() {},
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
  }
};

export default Tool;
