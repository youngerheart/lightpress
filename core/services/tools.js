import xtpl from 'xtpl';
import send from 'send';
import parseUrl from 'parseUrl';
import RestError from './resterror';
import func from './func';
import {allowFields} from './args';

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
    query = Tool.getParams(query, allowFields);
    for (var key in query) {
      if (query[key] === 'true') query[key] = true;
      if (query[key] === 'false') query[key] = false;
    }
    var {page, limit, sort, populate, search, ...otherQuery} = query;
    if (moduleName === 'article') {
      sort = '-publishTime';
      populate = 'category tag';
    }
    if (search) otherQuery.$or = [{title: new RegExp(search, 'i')}, {urlName: new RegExp(search, 'i')}];
    if (!moduleName) return otherQuery;
    if (isList) {
      page = page || 1;
      limit = limit || 10;
      sort = sort || '-createdAt';
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
  },
  dotSend(ctx) {
    return new Promise(function (resolve, reject) {
      send(ctx.req, process.cwd() + ctx.url, {dotfiles: 'allow'})
        .on('error', function (err) {
            reject(err);
        })
        .on('directory', function () {
            ctx.throw(404);
        })
        .on('headers', function (req, path, stat) {
            ctx.status = 200;
        })
        .on('stream', function (stream) {
            ctx.body = stream;
            resolve();
        })
        .on('end', function () {
            resolve();
        })
        .pipe(ctx.res);
    });
  }
};

export default Tool;
