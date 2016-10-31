import Article from '../models/article';

export default {
  async add(ctx) {
    var article = new Article(ctx.req.body);
    await article.save();
    ctx.body = {_id: article._id};
  },
  async list(ctx, next) {
    var article = await Article.find();
    if (ctx.type !== 'text/html') ctx.body = article;
    else {
      ctx._lg.body = article;
      return next();
    }
  }
};
