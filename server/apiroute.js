const Config = require('./controller/config');
const Admin = require('./controller/admin');
const Article = require('./controller/article');
const Category = require('./controller/category');
const Tag = require('./controller/tag');
const Comment = require('./controller/comment');

module.exports = (server) => {
  // 初始化博客
  server.post('/init', Config.isEmpty, Config.init);
  // 修改配置
  server.put('/config', Admin.isRoot, Config.change);
  // 查看配置
  server.get('/config', Admin.isRoot, Config.fetch);

  // 增加管理者
  server.post('/admin', Admin.add);
  // 注销管理者
  server.delete('/admin', Admin.isLogin, Admin.del);
  // 修改登录者信息
  server.put('/admin', Admin.isLogin, Admin.change);
  // 为登录者生成新密码发送到邮箱，并清除登录状态
  server.put('/admin/password', Admin.isLogin, Admin.changePassword, Admin.logout);
  // 修改权限
  server.put('/admin', Admin.isRoot, Admin.changeAuthority);
  // 显示管理者
  server.get('/admin', Admin.isRoot, Admin.fetchAll);
  // 登录
  server.post('/login', Admin.login);
  // 登出
  server.get('/logout', Admin.isLogin, Admin.logout);

  // 增加文章
  server.post('/article', Admin.isLogin, Article.add);
  // 删除文章
  server.delete('/article/id/:id', Admin.isLogin, Article.del);
  // 修改文章
  server.put('/article/id/:id', Admin.isLogin, Article.change);
  // 查找全部文章
  server.get('/article', Article.fetchAll);
  // 通过id查找文章
  server.get('/article/id/:id', Article.fetchById);

  // 获取某个类别的文章
  server.get('/category/:category', Category.fetchArticle);
  // 获取所有类别
  server.get('/category', Category.fetchAll);

  // 获取某个类别的文章
  server.get('/tag/:tag', Tag.fetchArticle);
  // 获取所有类别
  server.get('/category', Tag.fetchAll);

  // 增加评论
  server.post('/comment', Comment.add);
  // 删除评论
  server.delete('/comment/:id', Admin.isLogin, Comment.del);
  // 查看某个文章的评论
  server.get('/comment/article/:article', Comment.fetchByArticle);
  // 查看所有文章的评论
  server.get('/comment/article', Comment.fetchAll);
};
