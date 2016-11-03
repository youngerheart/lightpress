import config from '../models/config';
import theme from '../models/theme';
import article from '../models/article';
import category from '../models/category';
import tag from '../models/tag';
import RestError from '../services/resterror';
import {getQueryObj} from '../services/tools';

const Model = {config, theme, article, category, tag};

export default {
  async add(ctx, next) {
    var {moduleName} = ctx.params;
    var model = new Model[moduleName](ctx.req.body);
    await model.save();
    ctx.body = {_id: model._id};
    return next();
  },
  async del(ctx, next) {
    var {moduleName, id} = ctx.params;
    ctx.__lg.removed = await Model[moduleName].findOneAndRemove({urlName: id});
    return next();
  },
  async edit(ctx, next) {
    var {moduleName, id} = ctx.params;
    ctx.__lg.updated = await Model[moduleName].update({urlName: id}, ctx.req.body);
    ctx.status = 204;
    return next();
  },
  async list(ctx, next) {
    var {moduleName} = ctx.params;
    var {skip, limit, sort, populate, ...query} = getQueryObj(ctx.query, moduleName, true);
    ctx._lg.data = await Model[moduleName].find(query).populate(populate).skip(skip).limit(limit).sort(sort);
    if (!ctx._lg.data) throw new RestError(404, 'DATA_NOTFOUND_ERR');
    return next();
  },
  async get(ctx, next) {
    var {moduleName, id} = ctx.params;
    var {populate, ...query} = getQueryObj(ctx.query, moduleName);
    query.urlName = id;
    ctx._lg.data = await Model[moduleName].findOne(query).populate(populate);
    if (!ctx._lg.data) throw new RestError(404, 'DATA_NOTFOUND_ERR');
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
  },
  async extraAggregate(ctx, next) {
    var {moduleName} = ctx.params;
    var pointer = {};
    if (['tag', 'category'].indexOf(moduleName) === -1) return next();
    var paramArr = [{
      $match: getQueryObj(ctx.query)
    }, {
      $group: {_id: `$${moduleName}`, count: {'$sum': 1}}
    }];
    if (moduleName === 'tag') paramArr.unshift({$unwind: `$${moduleName}`});
    var data = await Model.article.aggregate(paramArr);
    data = await Model[moduleName].populate(data, {path: '_id'});
    data.forEach((item) => {
      if (item._id) pointer[item._id.urlName] = item.count;
    });
    ctx._lg.extra.aggregate = pointer;
    return next();
  },
  async extraDel(ctx, next) {
    var {moduleName} = ctx.params;
    var {_id} = ctx.__lg.removed;
    if (moduleName === 'tag') {
      await Model.article.update({tag: _id}, {$pull: {tag: _id}}, {multi: true});
    } else if (moduleName === 'category') {
      var item = await Model.category.findOne({urlName: 'outcast'});
      if (!item) {
        item = new Model.category({urlName: 'outcast', name: 'outcast'});
        await item.save();
      }
      await Model.article.update({category: _id}, {category: item._id}, {multi: true});
    }
    ctx.status = 204;
    return next();
  }
};
