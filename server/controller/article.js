const mongoose = require('mongoose');
const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tag = require('./../schemas/tag');
const Comment = require('./../schemas/comment');
const Tool = require('./../tool');
const selectStr = '-__v';
const selectUserStr = '-__v -password';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

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
      var tagArr = params.tag.split(',');
      tagArr.forEach((item, index) => {
        Tag.findOne({title: item}, (err, tag) => {
          if(err) return res.status(400).send('访问Tag出错');
          if(!tag) {
            tag = new Tag({
              title: item
            });
          }
          tag.article.push(mongoose.Types.ObjectId(article._id));
          article.tag.push(mongoose.Types.ObjectId(tag._id));
          tag.save((err) => {
            if(err) return res.status(400).send('储存Tag出错');
            if(index < tagArr.length - 1) return;
            // 此时没有问题，则储存所有数据
            category.save((err) => {
              if(err) return res.status(400).send('储存Category出错');
              article.save((err) => {
                if(err) return res.status(400).send('储存Article出错');
                return res.status(204).send();
              });
            });
          });
        });
      });
    });
  },

  del(req, res) {
    var id = req.params.id;
    var admin = req.session.admin;
    Article.findById(id, (err, article) => {
      if(err) return res.status(400).send('参数错误');
      if(!article) return res.status(404).send('没有找到该文章');
      if(admin._id === article.author || admin.authority === 3) {
        // 需要删除: 评论，category和tag执行 - 1
        Comment.remove({article: id}, (err, removed) => {
          if(err) return res.status(400).send('参数错误');
          Category.findById(article.category, (err, category) => {
            if(err || !category) return res.status(400).send('查找category失败');
            category.article.splice(category.article.indexOf(category._id), 1);
            article.tag.forEach((tagId, index) => {
              Tag.findById(tagId, (err, tag) => {
                tag.article.splice(tag.article.indexOf(article._id), 1);
                if(index < article.tag.length - 1) return;
                category.save((err) => {
                  if(err) return res.status(400).send('更新Category出错');
                  tag.save((err) => {
                    if(err) return res.status(400).send('更新Tag出错');
                    article.remove((err) => {
                      if(err) return res.status(400).send('删除Article出错');
                      return res.status(204).send();
                    });
                  });
                });
              });
            });
          });
        });
      }
      else return res.status(403).send('没有删除权限');
    });
  },

  change(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchById(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchAll(req, res) {
    populate(Article.find({}, selectStr)).exec((err, article) => {
      if(err) res.status(400).send('参数错误');
      return res.status(200).send(article);
    });
  }
};
