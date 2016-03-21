const Article = require('./../schemas/article');
const Tag = require('./../schemas/tag');
const Tool = require('./../tool');
const selectStr = '-__v';
const selectUserStr = '-__v -password';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

module.exports = {

  add(req, res) {
    var params = req.body;

    Tag.findOne({title: params.title}, (err, tag) => {
      if(err) return res.status(400).send(err);
      if(tag) return res.status(400).send({
        name: 'TAG_EXIST_ERR',
        message: '该标签已经存在了'
      });
      tag = new Tag({
        title: params.title
      });
      tag.save((err) => {
        if(err) return res.status(400).send(err);
        return res.status(200).send({id: tag._id});
      }); 
    });
  },

  fetchArticle(req, res, func) {
    const params = req.params;
    Tag.findOne({title: params.tag}, (err, tag) => {
      if(err) return func(400, err);
      if(!tag) return func(404, {
        name: 'TAG_NOTFOUND_ERR',
        message: '没有找到该标签'
      });
      Tool.format(populate(Article.find({_id: {$in: tag.article}})), params).exec((err, articles) => {
        if(err) return func(400, err);
        return func(200, articles);
      });
    });
  },

  fetchAll(req, res, func) {
    var zero = req.query.zero;
    Tool.format(Tag.find(zero ? {} : {article: {$not: {$size: 0}}}, selectStr), req.params)
    .exec((err, tags) => {
      if(err) return func(400, err);
      return func(200, tags);
    });
  }
};
