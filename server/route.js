module.exports = (server) => {
  // 初始化,管理员相关
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
};
