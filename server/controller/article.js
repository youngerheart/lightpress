const mongoose = require('mongoose');
const Promise = require('promise');
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

const objId = mongoose.Types.ObjectId;

const checkAuth = (req, res, callback) => {
  var id = req.params.id;
  var admin = req.session.admin;
  Article.findById(id, (err, article) => {
    if(err) return res.status(400).send('参数错误');
    if(!article) return res.status(404).send('没有找到该文章');
    if(admin._id === article.author || admin.authority === 3) callback(article, id);
    else return res.status(403).send('没有权限');
  });
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
      var tagArr = params.tag;
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
    checkAuth(req, res, (article, id) => {
      // 需要删除: 评论，category和tag执行 - 1
      Comment.remove({article: id}, (err, removed) => {
        if(err) return res.status(400).send('参数错误');
        Category.findById(article.category, (err, category) => {
          if(err || !category) return res.status(400).send('查找category失败');
          category.article.splice(category.article.indexOf(category._id), 1);
          article.tag.forEach((tagId, index) => {
            Tag.findById(tagId, (err, tag) => {
              tag.article.splice(tag.article.indexOf(article._id), 1);
              tag.save((err) => {
                if(err) return res.status(400).send('更新Tag出错');
                if(index < article.tag.length - 1) return;
                category.save((err) => {
                  if(err) return res.status(400).send('更新Category出错');
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
    });
  },

  change(req, res) {
    checkAuth(req, res, (article, id) => {
      const params = Tool.checkField(req.body, ['title', 'content', 'category', 'tag']);
      if(params.title) article.title = params.title;
      if(params.content) article.content = params.content;
      // category 相关操作
      var catePro = new Promise((resolve, reject) => {
        if(params.category) {
          Category.findById(article.category, (err, category) => {
            if(err) reject('访问Category出错');
            if(params.category !== category.title) {
              category.article.splice(category.article.indexOf(objId(category._id)), 1);
              Category.findOne({title: params.category}, (err, newCategory) => {
                if(err) reject('访问Category出错');
                if(!newCategory) {
                  newCategory = new Category({
                    title: params.category
                  });
                }
                newCategory.article.push(objId(article._id));
                article.category = newCategory._id;
                category.save((err) => {
                  if(err) reject('更新Category出错');
                  newCategory.save((err) => {
                    if(err) reject('创建Category出错');
                    resolve(article);
                  });
                });
              });
            } else resolve(article);
          });
        } else resolve(article);
      });

      // tag 相关操作
      var tagPro = new Promise((resolve, reject) => {
        if(params.tag) {
          // 先全部删除，再全部加上吧= =
          var tagArr = [];
          article.tag.forEach((tagId, index) => {
            Tag.findById(tagId, (err, tag) => {
              tag.article.splice(tag.article.indexOf(objId(article._id)));
              tag.save((err) => {
                if(err) reject('更新Tag出错');
                if(index < article.tag.length - 1) return;
                params.tag.forEach((tagTitle, index) => {
                  Tag.findOne({title: tagTitle}, (err, tag) => {
                    if(err) reject('查找tag出错');
                    if(!tag) tag = new Tag({ title: tagTitle });
                    tagArr.push(objId(tag._id));
                    tag.article.push(objId(article._id));
                    tag.save((err) => {
                      if(err) reject('储存Tag出错');
                      if(index < params.tag.length - 1) return;
                      article.tag = tagArr;
                      resolve(article);
                    });
                  });
                });
              });
            });
          });
        } else resolve(article);
      });
      
      catePro.then(() => {
        tagPro.then((article) => {
          article.save((err) => {
            if(err) res.status(400).send('储存Article出错');
            return res.status(204).send();
          });
        }, (err) => {
          return res.status(400).send(err);
        });
      }, (err) => {
        return res.status(400).send(err);
      });
    });
  },

  fetchById(req, res) {
    var id = req.params.id;
    populate(Article.find({_id: id}, selectStr)).exec((err, article) => {
      if(err) res.status(400).send('参数错误');
      return res.status(200).send(article);
    });
  },

  fetchAll(req, res) {
    populate(Article.find({}, selectStr)).exec((err, article) => {
      if(err) res.status(400).send('参数错误');
      return res.status(200).send(article);
    });
  }
};
