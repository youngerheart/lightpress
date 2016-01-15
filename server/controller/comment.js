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
    const comment = new Comment({
      ip: req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      name: params.name,
      content: params.content,
      article: params.article
    });
    Article.findById(params.article, (err, article) => {
      if(err) return res.status(400).send('参数错误');
      if(!article) return res.status(404).send('没有找到该文章');
      article.comment.push(objId(comment._id));
      article.save((err) => {
        if(err) return res.status(400).send('更新文章出错');
        comment.save((err) => {
          if(err) return res.status(400).send('储存留言出错');
          return res.status(204).send();
        });
      });
    });
  },

  del(req, res) {
    const id = req.params.id;
    Comment.findById(id, (err, comment) => {
      if(err) return res.status(400).send('参数错误');
      if(!comment) return res.status(404).send('没有找到该评论');
      Article.findById(comment.article, (err, article) => {
        if(err) return res.status(400).send('参数错误');
        if(!article) return res.status(404).send('没有找到该文章');
        article.comment.splice(objId(id), 1);
        article.save((err) => {
          if(err) return res.status(400).send('更新Article失败');
          comment.remove((err) => {
            if(err) return res.status(400).send('删除评论失败');
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
      if(err) return res.status(400).send('参数错误');
      if(!comment) return res.status(404).send('没有找到该评论');
      comment.name = params.name;
      comment.content = params.content;
      comment.save((err) => {
        if(err) return res.status(400).send('更新Comment失败');
        return res.status(204).send();
      });
    });
  },

  fetchByArticle(req, res) {
    const article = req.params.article;
    Comment.find({article: article}, selectStr).exec((err, comments) => {
      if(err) return res.status(400).send('参数错误');
      if(!comments) return res.status(404).send('没有找到任何评论');
      return res.status(200).send(comments);
    });
  },

  fetchAll(req, res) {
    Comment.find({}, selectStr).exec((err, comments) => {
      if(err) return res.status(400).send('参数错误');
      if(!comments) return res.status(404).send('没有找到任何评论');
      return res.status(200).send(comments);
    });
  }
};
