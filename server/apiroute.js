const Cache = require('memory-cache');
const Config = require('./controller/config');
const Admin = require('./controller/admin');
const Article = require('./controller/article');
const Category = require('./controller/category');
const Tag = require('./controller/tag');
const Comment = require('./controller/comment');
const APIFunc = (func) => {
  return (req, res) => {
    const cache = Cache.get(req.url);
    if(cache) return res.status(cache[0]).send(cache[1]);
    func(req, res, (code, data) => {
      Cache.put(req.url, [code, data], 60000);
      return res.status(code).send(data);
    });
  };
};

module.exports = (server) => {
  // 初始化博客
  server.post('/init', Config.isEmpty, Config.init);
  // 修改配置
  server.put('/config', Admin.isRoot, Config.change);
  // 查看配置
  server.get('/config', Admin.isRoot, APIFunc(Config.fetch));

  // 增加管理者
  server.post('/admin', Admin.add);
  // 注销管理者
  server.delete('/admin', Admin.isLogin, Admin.del);
  // 修改登录者信息
  server.put('/admin', Admin.isLogin, Admin.change);
  // 修改登录者密码
  server.put('/admin/password', Admin.isLogin, Admin.changePassword, Admin.logout);
  // 显示管理者
  server.get('/admin', Admin.isRoot, APIFunc(Admin.fetchAll));
  // 登录
  server.post('/login', Admin.login);
  // 登出
  server.get('/logout', Admin.isLogin, APIFunc(Admin.logout));

  // 增加文章
  server.post('/article', Admin.isLogin, Article.add);
  // 删除文章
  server.delete('/article/:id', Admin.isLogin, Article.del);
  // 修改文章
  server.put('/article/:id', Admin.isLogin, Article.change);
  // 查找全部文章
  server.get('/article', APIFunc(Article.fetchAll));
  // 通过id查找文章
  server.get('/article/:id', APIFunc(Article.fetchById));

  // 获取某个类别的文章
  server.get('/category/:id', APIFunc(Category.fetchArticle));
  // 获取所有类别
  server.get('/category', APIFunc(Category.fetchAll));

  // 获取某个标签的文章
  server.get('/tag/:id', APIFunc(Tag.fetchArticle));
  // 获取所有标签
  server.get('/tag', APIFunc(Tag.fetchAll));

  // 增加评论
  server.post('/comment', Comment.add);
  // 删除评论
  server.delete('/comment/:id', Comment.del);
  // 修改评论
  server.put('/comment/:id', Comment.change);
  // 查看某个文章的评论
  server.get('/comment/:article', APIFunc(Comment.fetchByArticle));
  // 查看所有文章的评论
  server.get('/comment', APIFunc(Comment.fetchAll));
};
