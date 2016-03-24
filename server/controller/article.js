const mongoose = require('mongoose');
const Promise = require('promise');
const Article = require('./../schemas/article');
const Category = require('./../schemas/category');
const Tag = require('./../schemas/tag');
const Comment = require('./../schemas/comment');
const Tool = require('./../tool');
const selectStr = '-__v -article';
const selectUserStr = '-__v -password -article';

const populate = (obj) => {
  return obj.populate('author', selectUserStr).populate('category', selectStr).populate('tag', selectStr).populate('comment', selectStr);
};

const objId = mongoose.Types.ObjectId;

const checkAuth = (req, res, callback) => {
  var id = req.params.id;
  var admin = req.session.admin;
  Article.findById(id, (err, article) => {
    if(err) return res.status(400).send(err);
    if(!article) return res.status(404).send({
      name: 'ARTICLE_NOTFOUND_ERR',
      message: '没有找到该文章'
    });
    if(admin._id === article.author || admin.authority === 3) callback(article, id);
    else return res.status(403).send({
      name: 'ARTICLE_AUTH_ERR',
      message: '没有权限'
    });
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
      if(err) return res.status(400).send(err);
      if(!category) {
        category = new Category({
          title: params.category
        });
      }
      category.article.push(objId(article._id));
      article.category = category._id;
      const saveArticle = () => {
        category.save((err) => {
          if(err) return res.status(400).send(err);
          article.save((err) => {
            if(err) return res.status(400).send(err);
            return res.status(200).send({id: article._id});
          });
        });
      };
      // 查找tag执行+1，要是没有则新增
      var tagArr = params.tag;
      if(!tagArr || !tagArr.length) saveArticle();
      tagArr.forEach((item, index) => {
        Tag.findOne({title: item}, (err, tag) => {
          if(err) return res.status(400).send(err);
          if(!tag) {
            tag = new Tag({
              title: item
            });
          }
          tag.article.push(objId(article._id));
          article.tag.push(objId(tag._id));
          tag.save((err) => {
            if(err) return res.status(400).send(err);
            if(index < tagArr.length - 1) return;
            // 此时没有问题，则储存所有数据
            saveArticle();
          });
        });
      });
    });
  },

  del(req, res) {
    checkAuth(req, res, (article, id) => {
      // 需要删除: 评论，category和tag执行 - 1
      Comment.remove({article: id}, (err, removed) => {
        if(err) return res.status(400).send(err);
        Category.findById(article.category, (err, category) => {
          if(err) return res.status(400).send(err);
          if(!category) return res.status(400).send({
            name: 'CATEGORY_NOTFOUND_ERR',
            message: '没有找到该分类'
          });
          category.article.splice(category.article.indexOf(category._id), 1);
          var removeArticle = () => {
            category.save((err) => {
              if(err) return res.status(400).send(err);
              article.remove((err) => {
                if(err) return res.status(400).send(err);
                return res.status(204).send();
              });
            });
          };
          // 没有tag的情况
          if(!article.tag.length) remove();
          article.tag.forEach((tagId, index) => {
            Tag.findById(tagId, (err, tag) => {
              tag.article.splice(tag.article.indexOf(article._id), 1);
              tag.save((err) => {
                if(err) return res.status(400).send(err);
                if(index < article.tag.length - 1) return;
                removeArticle();
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
      const articleId = objId(article._id);
      if(params.title) article.title = params.title;
      if(params.content) article.content = params.content;
      // category 相关操作
      var catePro = new Promise((resolve, reject) => {
        if(params.category) {
          Category.findById(article.category, (err, category) => {
            if(err) reject(err);
            if(!category) return res.status(404).send({
              name: 'CATEGORY_NOTFOUND_ERR',
              message: '没有找到该分类'
            });
            if(params.category !== category.title) {
              category.article.splice(category.article.indexOf(articleId), 1);
              Category.findOne({title: params.category}, (err, newCategory) => {
                if(err) reject(err);
                if(!newCategory) {
                  newCategory = new Category({
                    title: params.category
                  });
                }
                if(newCategory.article.indexOf(articleId) === -1) newCategory.article.push(articleId);
                article.category = newCategory._id;
                category.save((err) => {
                  if(err) reject({
                    name: 'CATEGORY_SAVE_ERR',
                    message: '更新Category出错'
                  });
                  newCategory.save((err) => {
                    if(err) reject({
                      name: 'CATEGORY_SAVE_ERR',
                      message: '创建Category出错'
                    });
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
        if(params.tag && params.tag.length) {
          // 先全部删除，再全部加上吧= =
          var tagArr = [];
          article.tag.forEach((tagId, index) => {
            Tag.findById(tagId, (err, tag) => {
              if(err) return res.status(400).send(err);
              if(!tag) return res.status(404).send({
                name: 'TAG_NOTFOUND_ERR',
                message: '没有找到该标签'
              });
              tag.article.splice(tag.article.indexOf(articleId), 1);
              tag.save((err) => {
                if(err) reject(err);
                if(index < article.tag.length - 1) return;
                params.tag.forEach((tagTitle, index) => {
                  Tag.findOne({title: tagTitle}, (err, tag) => {
                    if(err) reject(err);
                    if(!tag) tag = new Tag({ title: tagTitle });
                    tagArr.push(objId(tag._id));
                    if(tag.article.indexOf(articleId) === -1) tag.article.push(articleId);
                    tag.save((err) => {
                      if(err) reject(err);
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
            if(err) res.status(400).send(err);
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

  fetchById(req, res, func) {
    var params = req.params;
    Tool.format(populate(Article.findOne({_id: params.id}, selectStr)), params).exec((err, article) => {
      if(err) return func(400, err);
      if(!article) return func(404, {
        name: 'ARTICLE_NOTFOUND_ERR',
        message: '没有找到该文章'
      });
      return func(200, article);
    });
  },

  fetchAll(req, res, func) {
    Tool.format(populate(Article.find({}, selectStr)), req.params).exec((err, articles) => {
      if(err) return func(400, error);
      return func(200, articles);
    });
  },

  fetchByTitle(req, res, func) {
    var params = req.params;
    Tool.format(populate(Article.findOne({title: params.title}, selectStr)), params).exec((err, article) => {
      if(err) return func(400, error);
      if(!article) return func(404, {
        name: 'ARTICLE_NOTFOUND_ERR',
        message: '没有找到该文章'
      });
      return func(200, article);
    });
  }
};
