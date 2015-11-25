const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tag = require('./../schemas/tag');
const Comment = require('./../schemas/comment');
const Tool = require('./../tool');

module.exports = {

  add(req, res) {
    var admin = req.session.admin;
    var params = Tool.checkField(req.body, ['title', 'content', 'author', 'category', 'tag']);
    // 查找category和tag执行+1，要是没有则新增
    res.send(405, 'Method Not Allowed');
  },

  del(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  change(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchById(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchAll(req, res) {
    res.send(405, 'Method Not Allowed');
  }
};
