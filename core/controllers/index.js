export default {
  setPage(ctx, next) {
    var {_lg, __lg} = ctx;
    __lg.pagePath = `${__dirname}/../../themes/${_lg.config.theme}/pages/`;
    __lg.xtplPath = `${__lg.pagePath}${_lg.moduleName}.xtpl`;
    return next();
  }
};
