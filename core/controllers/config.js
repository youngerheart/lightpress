const Config = {
  get(ctx, next) {
    ctx._lg.info = {theme: 'demo', name: 'hehe'};
    return next();
  },
  set(ctx) {

  }
};

export default Config;
