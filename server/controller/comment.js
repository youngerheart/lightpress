const mongoose = require('mongoose');
const Admin = require('./../schemas/admin');
const Comment = require('./../schemas/comment');
const Article = require('./../schemas/article');
const Tool = require('./../tool');

const selectStr = '-__v';

const objId = mongoose.Types.ObjectId;

module.exports = {

  add(req, res) {
    const params = Tool.checkField(req.body, ['name', 'content', 'article']);
    // 生成实例
    Article.findOne({title: params.article}, (err, article) => {
      const comment = new Comment({
        ip: req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        name: params.name,
        content: params.content,
        article: article._id
      });
      if(err) return res.status(400).send(err);
      if(!article) return res.status(404).send({
        name: 'ARTICLE_NOTFOUND_ERR',
        message: '没有找到该文章'
      });
      article.comment.push(objId(comment._id));
      article.save((err) => {
        if(err) return res.status(400).send(err);
        comment.save((err) => {
          if(err) return res.status(400).send(err);
          return res.status(200).send({
            id: comment._id,
            ip: comment.ip,
            meta: comment.meta
          });
        });
      });
    });
  },

  del(req, res) {
    const id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if(err) return res.status(400).send(err);
      if(!comment) return res.status(404).send({
        name: 'COMMENT_NOTFOUND_ERR',
        message: '没有找到该评论'
      });
      Article.findById(comment.article, (err, article) => {
        if(err) return res.status(400).send(err);
        if(!article) return res.status(404).send({
          name: 'ARTICLE_NOTFOUND_ERR',
          message: '没有找到该文章'
        });
        article.comment.splice(article.comment.indexOf(objId(id)), 1);
        article.save((err) => {
          if(err) return res.status(400).send(err);
          comment.remove((err) => {
            if(err) return res.status(400).send(err);
            return res.status(204).send();
          }); 
        });
      });
    });
  },

  change(req,res) {
    const params = Tool.checkField(req.body, ['name', 'content']);
    const id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if(err) return res.status(400).send(err);
      if(!comment) return res.status(404).send({
        name: 'COMMENT_NOTFOUND_ERR',
        message: '没有找到该评论'
      });
      comment.name = params.name;
      comment.content = params.content;
      comment.save((err) => {
        if(err) return res.status(400).send(err);
        return res.status(204).send();
      });
    });
  },

  fetchByArticle(req, res, func) {
    const params = req.params;
    Article.findOne({title: params.article}, (err, article) => {
      if(err) return func(400, err);
      if(!article) return func(404, {
        name: 'ARTICLE_NOTFOUND_ERR',
        message: '没有找到该文章'
      });
      Tool.format(Comment.find({article: article._id}, selectStr), params)
      .exec((err, comments) => {
        if(err) return func(400, err);
        if(!comments) return func(404, {
          name: 'COMMENT_NOTFOUND_ERR',
          message: '没有找到任何评论'
        });
        return func(200, comments);
      });
    });
  },

  fetchAll(req, res, func) {
    const params = req.params;
    Tool.format(Comment.find({}, selectStr), params)
    .exec((err, comments) => {
      if(err) return func(400, err);
      if(!comments) return func(404, {
        name: 'COMMENT_NOTFOUND_ERR',
        message: '没有找到任何评论'
      });
      return func(200, comments);
    });
  }
};
