const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tool = require('./../tool');
const selectStr = '-__v';
const selectUserStr = '-__v -password';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

module.exports = {

  add(req, res) {
    var params = req.body;

    Category.findOne({title: params.title}, (err, category) => {
      if(err) return res.status(400).send(err);
      if(category) return res.status(400).send({
        name: 'CATEGORY_EXIST_ERR',
        message: '该分类已经存在了'});
      category = new Category({
        title: params.title
      });
      category.save((err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send({id: category._id});
      }); 
    });
  },

  fetchArticle(req, res, func) {
    const params = req.params;
    Category.findOne({title: params.category}, (err, category) => {
      if(err) return func(400, err);
      if(!category) return func(404, {
        name: 'CATEGORY_NOTFOUND_ERR',
        message: '没有找到该分类'
      });
      Tool.format(populate(Article.find({_id: {$in: category.article}})), params).exec((err, articles) => {
        if(err) return func(400, err);
        return func(200, articles);
      });
    });
  },

  fetchAll(req, res, func) {
    var zero = req.query.zero;
    Tool.format(Category.find(zero ? {} : {article: {$not: {$size: 0}}}, selectStr), req.params)
    .exec((err, categories) => {
      if(err) return func(400, err);
      if(!categories) return func(404, {
        name: 'CATEGORY_NOTFOUND_ERR',
        message: '没有找到任何该分类'
      });
      return func(200, categories);
    });
  }
};
