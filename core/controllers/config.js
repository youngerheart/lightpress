const Config = {
  get(ctx, next) {
    ctx._lg.config = {theme: 'demo'};
    return next();
  },
  set(ctx) {

  }
};

export default Config;
