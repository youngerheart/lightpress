const Admin = {
  setPage(ctx, next) {
    var {params, __lg} = ctx;
    __lg.pagePath = `${__dirname}/../../admin/pages/`;
    __lg.xtplPath = `${__lg.pagePath}${params.moduleName}.xtpl`;
    return next();
  }
};

export default Admin;
