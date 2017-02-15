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
  async del() {
    var {moduleName, id} = ctx.params;
    await Model[moduleName].remove({urlName: id});
    ctx.status = 204;
  },
  async edit(ctx, next) {
    var {moduleName, id} = ctx.params;
    console.log(ctx.req.body, id);
    await Model[moduleName].update({urlName: id}, ctx.req.body);
    ctx.status = 204;
  },
  async list(ctx, next) {
    var {moduleName} = ctx.params;
    var {skip, limit, sort, populate, ...query} = getQueryObj(ctx.query, moduleName, true);
    ctx._lg.data = await Model[moduleName].find(query).populate(populate).skip(skip).limit(limit).sort(sort);
    return next();
  },
  async get(ctx, next) {
    var {moduleName, id} = ctx.params;
    var {populate, ...query} = getQueryObj(ctx.query, moduleName);
    query.urlName = id;
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
      isPublished: await Model[moduleName].count({isDraft: false, isRecycled: false}),
      isDraft: await Model[moduleName].count({isDraft: true, isRecycled: false}),
      isRecycled: await Model[moduleName].count({isRecycled: true}),
      isList: await Model[moduleName].count(query)
    } : await Model[moduleName].count(query);
    return next();
  }
};
