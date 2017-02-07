const Index = {
  setPage(ctx, next) {
    var {params, _lg, __lg} = ctx;
    __lg.pagePath = `${__dirname}/../../themes/${_lg.config.theme}/pages/`;
    __lg.xtplPath = `${__lg.pagePath}${params.moduleName}.xtpl`;
    return next();
  }
};

export default Index;
