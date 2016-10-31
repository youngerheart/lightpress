import Category from '../models/category';

export default {
  async add(ctx) {
    var category = new Category(ctx.req.body);
    await category.save();
    ctx.body = {_id: category._id};
  },
  async list(ctx, next) {
    var category = await Category.find();
    if (ctx.type !== 'text/html') ctx.body = category;
    else {
      ctx._lg.body = category;
      return next();
    }
  }
};
