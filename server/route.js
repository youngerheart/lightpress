const Promise = require('promise');
const Cache = require('memory-cache');
const Config = require('./controller/config');
const Admin = require('./controller/admin');
const Article = require('./controller/article');
const Category = require('./controller/category');
const Tag = require('./controller/tag');
const Comment = require('./controller/comment');
const DataFunc = (req, res, func) => {
  return new Promise((resolve, reject) => {
    const cache = Cache.get(req.url);
    if(cache) {
      if(cache[0] < 300) resolve(cache[1]);
      else reject(cache[1]);
    }
    func(req, res, (code, data) => {
      Cache.put(req.url, [code, data], 60000);
      if(code < 300) resolve(data);
      else reject(data);
    });
  });
};

module.exports = (server) => {

  /**************用户相关**************/
  // 主页
  server.get('/', (req, res) => {
    var articles = DataFunc(req, res, Article.fetchAll);
    var config = DataFunc(req, res, Config.fetch);
    Promise.all([articles, config]).then((data) => {
      res.render('app/index', {
        articles: data[0],
        config: data[1]
      });
    }, (data) => {
      res.render('app/error', {
        articles: data[0],
        config: data[1]
      });
    });
  });

  // 文章页
  server.get('/article/:title', (req, res) => {
    res.render('app/article');
  });

  /**************内容管理相关**************/
  // 登录页
  server.get('/admin/login', (req, res) => {
    res.render('admin/login');
  });
  // 文章列表
  server.get('/admin/list', (req, res) => {
    res.render('admin/list');
  });
  // 文章编辑
  server.get('/admin/list', (req, res) => {
    res.render('admin/edit');
  });

  /**************测试相关**************/

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
