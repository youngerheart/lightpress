import xtpl from 'xtpl';
import RestError from './resterror';

const Tool = {
  dealSchema() {},
  async renderPage(ctx, next) {
    var {params, _lg} = ctx;
    var path = `${__dirname}/../../themes/${_lg.info.theme}.pages/${params.moduleName}.xtpl`;
    try {
      ctx.body = await new Promise((resolve, reject) => {
        xtpl.renderFile(path, _lg, function(error, content) {
          if(error) reject(error);
          else resolve(content);
        });
      });
    } catch (err) {
      throw new RestError(500, 'XTPL_ERROR', message);
    }
  }
};

export default Tool;
