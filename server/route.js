const Promise = require('promise');
const Config = require('./controller/config');
const Admin = require('./controller/admin');
const Article = require('./controller/article');
const Category = require('./controller/category');
const Tag = require('./controller/tag');
const Comment = require('./controller/comment');
const DataFunc = (req, res, func) => {
  return new Promise((resolve, reject) => {
    func(req, res, (code, data) => {
      if(code < 300) resolve(data);
      else reject(data);
    });
  });
};

module.exports = (server) => {
  // 主页
  server.get('/', (req, res) => {
    DataFunc(req, res, Article.fetchAll)
    .then((data) => {
      res.render('app/index', data);
    }, (data) => {
      res.render('app/error', data);
    });
  });
  // 初始化,配置,管理员相关
  server.get('/test/admin', (req, res) => {
    res.render('test/admin');
  });
  // 文章相关
  server.get('/test/article', (req, res) => {
    res.render('test/article');
  });
  // 评论相关
  server.get('/test/comment', (req, res) => {
    res.render('test/comment');
  });
  // 类别,标签,其他相关
  server.get('/test/other', (req, res) => {
    res.render('test/other');
  });
};
