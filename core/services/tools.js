import xtpl from 'xtpl';
import RestError from './resterror';
import func from './func';

const Tool = {
  dealSchema() {},
  getParams(params, fields) {
    var newParams = {};
    fields.forEach((item) => {
      if (params[item] !== undefined) newParams[item] = params[item];
    });
    return newParams;
  },
  getQueryObj(query, moduleName, isList) {
    var {page, limit, sort, populate, search, ...otherQuery} = query;
    var isArticle = moduleName === 'article';
    if (isArticle) {
      sort = '-publishTime';
      populate = 'category tag';
    }
    if (search) otherQuery.urlName = new RegExp(search);
    if (!moduleName) return otherQuery;
    populate = populate || '';
    if (isList) {
      page = page || 1;
      limit = limit || 10;
      sort = sort || '-createdAt';
      if (isArticle && !otherQuery.isDraft && !otherQuery.isRecycled) {
        otherQuery.isDraft = false;
        otherQuery.isRecycled = false;
      }
      return {
        limit, sort, populate, ...otherQuery,
        skip: (page - 1) * limit
      };
    } else return {populate, ...otherQuery};
  },
  async renderAPI(ctx) {
    ctx.body = ctx._lg.data;
  },
  async renderPage(ctx) {
    var {_lg, __lg} = ctx;
    _lg.query = ctx.query;
    _lg.func = func;
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
    process.stderr.write(err.stack + '\n');
    try {
      _lg.error = err;
      if (!__lg.pagePath) throw err;
      _lg.moduleName = 'error';
      ctx.body = await new Promise((resolve, reject) => {
        xtpl.renderFile(`${__lg.pagePath}/error.xtpl`, _lg, function(error, content) {
          if (error) reject(err);
          else resolve(content);
        });
      });
    } catch (err) {
      ctx.type = 'json';
      let {status, name, message, errors} = err;
      ctx.status = status || 500;
      if (name) ctx.body = {name, message, errors};
    }
  },
  checkUrl(ctx, next) {
    if (ctx.url.split('.').length > 1) throw new RestError(403, 'REQUEST_INVALID_ERR');
    if (ctx.method !== 'GET' && ctx.type === 'text/html') throw new RestError(403, 'REQUEST_METHOD_ERR');
    return next();
  }
};

export default Tool;
