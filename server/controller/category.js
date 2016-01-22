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
      if(err) return res.status(400).send('参数错误');
      if(category) return res.status(405).send('该分类已经存在了');
      category = new Category({
        title: params.title
      });
      category.save((err) => {
        if(err) return res.status(400).send('参数错误');
        return res.status(200).send({id: category._id});
      }); 
    });
  },

  fetchArticle(req, res, func) {
    const params = req.params;
    Tool.format(populate(Article.find({category: params.id}, selectStr)), params)
    .exec((err, articles) => {
      if(err) return func(400, '参数错误');
      if(!articles) return func(404, '没有找到任何文章');
      return func(200, articles);
    });
  },

  fetchAll(req, res, func) {
    Tool.format(Category.find({}, selectStr), req.params)
    .exec((err, categories) => {
      if(err) return func(400, '参数错误');
      if(!categories) return func(404, '没有找到任何分类');
      return func(200, categories);
    });
  }
};
