const mongoose = require('mongoose');
const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tag = require('./../schemas/tag');
const Comment = require('./../schemas/comment');
const Tool = require('./../tool');

module.exports = {

  add(req, res) {
    const admin = req.session.admin;
    const params = Tool.checkField(req.body, ['title', 'content', 'author', 'category', 'tag']);

    // 生成文章实例，获取文章id
    const article = new Article({
      title: params.title,
      content: params.content,
      author: admin._id
    });

    // 查找category执行+1，要是没有则新增
    Category.findOne({title: params.category}, (err, category) => {
      if(err) return res.status(400).send('访问Category出错');
      if(!category) {
        category = new Category({
          title: params.category
        });
      }
      category.article.push(mongoose.Types.ObjectId(article._id));
      article.category = category._id;
      // 查找tag执行+1，要是没有则新增
      params.tag.forEach((item) => {
        Tag.findOne({title: item}, (err, tag) => {
          if(err) return res.status(400).send('访问Tag出错');
          if(!tag) {
            tag = new Category({
              title: item
            });
          }
          tag.article.push(mongoose.Types.ObjectId(article._id));
          article.tag.push(mongoose.Types.ObjectId(tag._id));
        });
        // 此时没有问题，则储存所有数据
        tag.save((err) => {
          if(err) return res.status(400).send('储存Tag出错');
          category.save((err) => {
            if(err) return res.status(400).send('储存Category出错');
            article.save((err) => {
              if(err) return res.status(400).send('储存Article出错');
              res.status(204).send();
            });
          });
        });
      });
    });
    res.status(405).send('Method Not Allowed');
  },

  del(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  change(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchById(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchAll(req, res) {
    res.status(405).send('Method Not Allowed');
  }
};
