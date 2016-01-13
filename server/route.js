module.exports = (server) => {
  // 主页
  server.get('/', (req, res) => {
    res.render('app/index');
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
