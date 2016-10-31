export default {
  get(ctx, next) {
    ctx._lg.body = {title: '123'};
    return next();
  },
  set(ctx) {

  }
};
