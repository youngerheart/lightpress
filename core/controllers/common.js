import config from '../models/config';
import theme from '../models/theme';
import article from '../models/article';
import category from '../models/category';
import tag from '../models/tag';
import comment from '../models/comment';
import RestError from '../services/resterror';
import {getQueryObj} from '../services/tools';

const Model = {config, theme, article, category, tag, comment};

const setArticleQuery = async(query) => {
  if (!query.isDraft && !query.isRecycled) {
    query.isDraft = false;
    query.isRecycled = false;
  }
  var setField = async(query, field) => {
    query[field] = await Model[field].findOne({urlName: query[field]});
    if (!query[field]) throw new RestError(404, 'DATA_NOTFOUND_ERR', `that ${field} is not found`);
    else query[field] = query[field]._id;
  };
  if (query.tag) await setField(query, 'tag');
  if (query.category) await setField(query, 'category');
};

const getOthersQuery = (moduleName, id) => {
  return ['article', 'tag', 'category'].indexOf(moduleName) === -1 ? {_id: id} : {$or: [{_id: id}, {urlName: id}]};
};

const getAggregateData = async(moduleName, query) => {
  var paramArr = [{
    $match: query || {}
  }, {
    $group: {_id: `$${moduleName}`, count: {'$sum': 1}}
  }];
  if (moduleName === 'tag') paramArr.unshift({$unwind: `$${moduleName}`});
  var data = await Model.article.aggregate(paramArr);
  data = await Model[moduleName].populate(data, {path: '_id'});
  if (!query) {
    data = data.map((item) => {
      item = JSON.parse(JSON.stringify(item));
      item._id.count = item.count;
      return item._id;
    });
  }
  return data;
};

export default {
  async add(ctx, next) {
    var {moduleName} = ctx.params;
    var extra = ctx._lg.extra;
    var model = new Model[moduleName](ctx.req.body);
    await model.save();
    ctx._lg.data = {_id: model._id};
    if (Object.keys(extra).length > 0) ctx._lg.data.extra = extra;
    return next();
  },
  async del(ctx, next) {
    var {moduleName, id} = ctx.params;
    ctx.__lg.removed = await Model[moduleName].findOneAndRemove(getOthersQuery(moduleName, id));
    return next();
  },
  async edit(ctx, next) {
    var {moduleName, id} = ctx.params;
    ctx.__lg.updated = await Model[moduleName].findOneAndUpdate(getOthersQuery(moduleName, id), ctx.req.body);
    ctx.status = 204;
    return next();
  },
  async list(ctx, next) {
    var {moduleName} = ctx.params;
    var {skip, limit, sort, populate, ...query} = getQueryObj(ctx.query, moduleName, true);
    if (moduleName === 'article') await setArticleQuery(query);
    ctx._lg.data = await Model[moduleName].find(query).select('-mdContent').populate(populate || '').skip(skip).limit(limit).sort(sort);
    if (moduleName === 'article') {
      ctx._lg.data.forEach((item) => {
        item.htmlContent = item.htmlContent.replace(/<[^>]+>/g, '').substr(0, 100);
      });
    }
    return next();
  },
  async get(ctx, next) {
    var {moduleName, id} = ctx.params;
    var {populate, ...query} = getQueryObj(ctx.query, moduleName);
    query.urlName = id;
    ctx._lg.data = await Model[moduleName].findOne(query).populate(populate || '');
    if (!ctx._lg.data) throw new RestError(404, 'DATA_NOTFOUND_ERR', 'data is not found');
    return next();
  },
  async count(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query, moduleName);
    ctx._lg.data = await Model[moduleName].count(query);
    return next();
  },
  async extraCount(ctx, next) {
    var {moduleName} = ctx.params;
    var query = getQueryObj(ctx.query, moduleName);
    if (moduleName === 'article') await setArticleQuery(query);
    delete query.populate;
    ctx._lg.extra.count = moduleName === 'article' ?
      {
        isPublished: await Model[moduleName].count({isDraft: false, isRecycled: false}),
        isDraft: await Model[moduleName].count({isDraft: true, isRecycled: false}),
        isRecycled: await Model[moduleName].count({isRecycled: true}),
        isList: await Model[moduleName].count(query)
      } : await Model[moduleName].count(query);
    return next();
  },
  async getAggregate(ctx, next) {
    var {moduleName} = ctx.params;
    if (['tag', 'category'].indexOf(moduleName) === -1) return next();
    var pointer = {};
    var query = getQueryObj(ctx.query);
    var data = await getAggregateData(moduleName, query);
    data.forEach((item) => {
      if (item._id) pointer[item._id.urlName] = item.count;
    });
    ctx._lg.data.forEach((item) => {
      item.count = pointer[item.urlName] || 0;
    });
    return next();
  },
  async extraAggregate(ctx, next) {
    ctx._lg.extra.category = await getAggregateData('category');
    ctx._lg.extra.tag = await getAggregateData('tag');
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
  },
  async extraArticle(ctx, next) {
    var {publishTime, _id} = ctx._lg.data;
    ctx._lg.extra.article = {
      previous: await Model.article.findOne({publishTime: {$lt: publishTime}}).sort({publishTime: -1}).select('_id urlName title'),
      next: await Model.article.findOne({publishTime: {$gt: publishTime}}).sort({publishTime: 1}).select('_id urlName title')
    };
    // get all comments
    ctx._lg.extra.comments = await Model.comment.find({belong: _id}).sort({createdAt: -1}).populate('reply');
    return next();
  }
};
