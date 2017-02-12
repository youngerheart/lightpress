import Tag from '../models/tag';

export default {
  async add(ctx) {
    var tag = new Tag(ctx.req.body);
    await tag.save();
    ctx.body = {_id: tag._id};
  },
  async list(ctx, next) {
    var tag = await Tag.find();
    if (ctx.type !== 'text/html') ctx.body = tag;
    else {
      ctx._lg.body = tag;
      return next();
    }
  }
};
