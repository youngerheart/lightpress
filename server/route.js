const Admin = require('./controller/admin');

module.exports = (server) => {
  // 增加管理者
  server.post('/admin', Admin.isRoot, Admin.add);
  // 删除管理者
  server.del('/admin/id/:id', Admin.isRoot, Admin.del);
  // 修改管理者
  server.put('/admin/id/:id', Admin.isRoot, Admin.change);
  // 显示管理者
  server.get('/admin', Admin.isRoot, Admin.fetchAll);
  // 登录
  server.post('/login', Admin.login);
  // 登出
  server.get('/logout', Admin.loginRequired, Admin.logout);
};