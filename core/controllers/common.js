import config from '../models/config';
import theme from '../models/theme';
import article from '../models/article';
import category from '../models/category';
import tag from '../models/tag';
import {getQueryObj} from '../services/tools';

const Model = {config, theme, article, category, tag};

export default {
  async add(ctx) {
    var {moduleName} = ctx.params;
    var model = new Model[moduleName](ctx.req.body);
    await model.save();
    ctx.body = {_id: model._id};
  },
  async del() {},
  async edit(ctx, next) {},
  async list(ctx, next) {
    var {moduleName} = ctx.params;
    var {skip, limit, sort, populate, ...query} = getQueryObj(ctx.query, moduleName, true);
    ctx._lg.data = await Model[moduleName].find(query).populate(populate).skip(skip).limit(limit).sort(sort);
    return next();
  },
  async get(ctx, next) {
    var {moduleName} = ctx.params;
    var {populate, ...query} = getQueryObj(ctx.query, moduleName);
    ctx._lg.data = await Model[moduleName].findOne(query).populate(populate);
    return next();
  },
  async count(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query);
    ctx._lg.data = await Model[moduleName].count(query);
    return next();
  },
  async extraCount(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query);
    ctx._lg.extra.count = moduleName === 'article' ?
    {
      isPublished: await Model[moduleName].count({...query, isDraft: false, isRecycled: false}),
      isDraft: await Model[moduleName].count({...query, isDraft: true, isRecycled: false}),
      isRecycled: await Model[moduleName].count({...query, isRecycled: true})
    } : await Model[moduleName].count(query);
    return next();
  }
};
