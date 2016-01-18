const Article = require('./../schemas/article');
const Tag = require('./../schemas/tag');
const Tool = require('./../tool');
const selectStr = '-__v';
const selectUserStr = '-__v -password';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

module.exports = {

  fetchArticle(req, res, func) {
    const params = req.params;
    Tag.findById(params.id, (err, tag) => {
      if(err) return func(400, '参数错误');
      if(!tag) return func(404, '没有找到该分类');
      Tool.format(populate(Article.find({_id: {$in: tag.article}})), params).exec((err, articles) => {
        if(err) return func(400, '参数错误');
        return func(200, articles);
      });
    });
  },

  fetchAll(req, res, func) {
    Tool.format(Tag.find({}, selectStr), req.params)
    .exec((err, tags) => {
      if(err) return func(400, '参数错误');
      return func(200, tags);
    });
  }
};
