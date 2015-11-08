const Admin = require('./../schemas/admin');
const selectStr = '-password -__v';

module.exports = {

  init(req, res) {
    var params = req.params;
    const root = new Admin({
      name: params.name,
      authority: 3,
      password: params.password,
      email: params.email
    });
    Admin.findOne({authority: 3}, (err, admin) => {
      if(err || admin) return;
      root.save((err) => {
        if(err) return console.log(err);
        console.log('管理用户初始化完成!');
      });
    });
  },

  add(req, res) {
    var params = req.params;
    if(params.authority > 2) return res.send(400, '参数错误');

    Admin.findOne({name: params.name}, (err, admin) => {
      if(err) return res.send(400, '参数错误');
      if(admin) return res.send(400, '该用户名已经被使用了');
      admin = new Admin({
        name: params.name,
        email: params.email,
        phone: params.phone,
        password: params.password,
        authority: params.authority
      });
      admin.save((err) => {
        if(err) return res.send(400, '参数错误');
        res.send(204);
      }); 
    });
  },

  del(req, res) {
    Admin.remove({_id: req.params.id}, (err, removed) => {
      if(err) return res.send(400, '参数错误');
      if(!removed.result.n) return res.send(404, '没有找到该用户');
      return res.send(204);
    });
  },

  change(req, res) {
    var params = req.params;
    if(params.authority > 2) return res.send(400, '参数错误');
    var id = params.id;
    delete params.id;
    Admin.updateWithDate({_id: id}, params, (err, updated) => {
      if(!updated.nModified) res.send(400, '字段没有修改');
      if(err) return res.send(404, '没有找到该用户');
      return res.send(204);
    });
  },

  // 查询admin
  fetchAll(req, res) {
    Admin.fetch({}, selectStr, (err, admin) => {
      if(err) return res.send(400, '参数错误');
      return res.send(200, admin);
    });
  },

  // 检查登录状态
  loginRequired(req, res, next) {
    if(!req.session.admin) {
      return res.send(401, '未登录');
    }
    next();
  },

  // 检查是否是管理员
  isRoot(req, res, next) {
    var admin = req.session.admin;
    if(!admin || admin.authority !== 3) {
      return res.send(403, '没有权限');
    }
    next();
  },

  // 登录
  login(req,res) {
    var params = req.params;
    if(req.session.admin) return res.send(405, '你已经登录了');
    Admin.findOne({name: params.name}, (err, admin) => {
      if(err) return res.send(400, '参数错误');
      if(!admin) return res.send(404, '没有找到该用户');
      if(!params.password) return res.send(400, '参数错误');
      admin.comparePassword(params.password, (err, isMatch) => {
        if(err) return res.send(400, '参数错误');
        if(!isMatch) return res.send(400, '用户名或密码错误');
        // 设置cookie
        req.session.admin = admin;
        res.setCookie('admin', admin.name.toString(), {
          path: '/',
          expires: new Date(Date.now() + 36000000)
        });
        res.send(204);
      });
    });
  },

  // 登出
  logout(req, res) {
    delete req.session.admin;
    res.setCookie('admin', '', {
      path: '/',
      expires: new Date()
    });
    res.send(204);
  }
};
