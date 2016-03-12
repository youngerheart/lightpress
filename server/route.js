const Promise = require('promise');
const Cache = require('memory-cache');
const Config = require('./schemas/config');
const Admin = require('./controller/admin');
const Article = require('./controller/article');
const Category = require('./controller/category');
const Tag = require('./controller/tag');
const Comment = require('./controller/comment');
const staticInfo = require('./../static');
var config = null;

Config.findOne({}, (err, conf) => {
  if(err) return;
  config = conf;
});

const DataFunc = (req, res, func) => {
  return new Promise((resolve, reject) => {
    const cache = Cache.get(req.url);
    if(cache) {
      if(cache[0] < 300) resolve(cache[1]);
      else reject(cache[1]);
    }
    func(req, res, (code, data) => {
      Cache.put(req.url, [code, data], 100);
      if(code < 300) resolve(data);
      else reject(data);
    });
  });
};

const isLogin = (req, res, next) => {
  if(!req.session.admin) {
    return res.redirect('/admin/login');
  }
  next();
};

const getArticleInfo = (req, res, articles) => {
  articles.then((data) => {
    if(config) res.redirect('/admin/init');
    var temp, params;
    params = {
      article: data,
      config: config,
      static: staticInfo[config.lang]
    };
    temp = Array.isArray(data[0]) ? 'app/index' : 'app/article';
    res.render(temp, params);
  }, () => {
    res.render('app/error', '获取数据失败');
  });
};

module.exports = (server) => {

  /**************用户相关**************/
  // 主页
  server.get('/', (req, res) => {
    var articles = DataFunc(req, res, Article.fetchAll);
    getArticleInfo(req, res, articles);
  });

  // 文章页
  server.get('/article/:title', (req, res) => {
    var article = DataFunc(req, res, Article.fetchByTitle);
    getArticleInfo(req, res, article);
  });

  // 类别文章页
  server.get('/category/:category', (req, res) => {
    var articles = DataFunc(req, res, Category.fetchArticle);
    getArticleInfo(req, res, articles);
  });

  // 标签文章页
  server.get('/tag/:tag', (req, res) => {
    var articles = DataFunc(req, res, Tag.fetchArticle);
    getArticleInfo(req, res, articles);
  });

  /**************内容管理相关**************/
  // 文章列表
  server.get('/admin', isLogin, (req, res) => {
    DataFunc(req, res, Article.fetchAll).then((data) => {
      res.render('admin/list', {
        articles: data,
        config: config,
        static: staticInfo[config.lang]
      });
    }, () => {
      res.render('app/error', '获取数据失败');
    });
  });
  // 登录页
  server.get('/admin/login', (req, res) => {
    if(!config) res.redirect('/admin/init');
    res.render('admin/login', {
      config: config,
      static: staticInfo[config.lang]
    });
  });
  // 文章编辑
  server.get('/admin/edit', isLogin, (req, res) => {
    res.render('admin/edit', {static: staticInfo[config.lang]});
  });
  // 设置
  server.get('/admin/setting', isLogin, (req, res) => {
    res.render('admin/setting', {static: staticInfo[config.lang]});
  });

  server.get('/admin/init', (req, res) => {
    if(config) return res.redirect('/admin');
    res.render('admin/init', {static: staticInfo[config.lang]});
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
