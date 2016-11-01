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
  async edit() {},
  async list(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query);
    ctx._lg.data = moduleName === 'article' ?
      await Model[moduleName].find(query).populate('category tag') :
      await Model[moduleName].find(query);
    return next();
  },
  async get(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query);
    ctx._lg.data = moduleName === 'article' ?
      await Model[moduleName].findOne(query).populate('category tag') :
      await Model[moduleName].findOne(query);
    return next();
  },
  async count(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query);
    ctx._lg.data = await Model[moduleName].count(query);
    return next();
  }
};
