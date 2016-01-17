const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tool = require('./../tool');
const selectStr = '-__v';
const selectUserStr = '-__v -password';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

module.exports = {

  fetchArticle(req, res) {
    const params = req.params;
    Tool.format(populate(Article.find({category: params.id}, selectStr)), params)
    .exec((err, articles) => {
      if(err) res.status(400).send('参数错误');
      return res.status(200).send(articles);
    });
  },

  fetchAll(req, res) {
    Tool.format(Category.find({}, selectStr), req.params)
    .exec((err, categories) => {
      if(err) res.status(400).send('参数错误');
      return res.status(200).send(categories);
    });
  }
};
