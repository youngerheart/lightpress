const Article = {
  get(ctx, next) {
    ctx._lg.body = {title: '123'};
    return next();
  },
  set(ctx) {

  }
};

export default Article;
