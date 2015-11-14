module.exports = (server) => {
  // 初始化博客
  server.get('/', (req, res) => {
    res.render('tester');
  });
};
