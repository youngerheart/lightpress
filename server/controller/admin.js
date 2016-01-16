const Admin = require('./../schemas/admin');
const Tool = require('./../tool');
const selectStr = '-password -__v';

module.exports = {

  add(req, res) {
    var params = req.body;
    if(params.authority > 2) return res.status(400).send('参数错误');

    Admin.findOne({name: params.name}, (err, admin) => {
      if(err) return res.status(400).send('参数错误');
      if(admin) return res.status(405).send('该用户名已经被使用了');
      admin = new Admin({
        name: params.name,
        email: params.email,
        password: params.password,
        authority: params.authority
      });
      admin.save((err) => {
        if(err) return res.status(400).send('参数错误');
        res.status(204).send();
      }); 
    });
  },

  del(req, res) {
    Admin.remove({_id: req.params.id}, (err, removed) => {
      if(err) return res.status(400).send('参数错误');
      if(!removed.result.n) return res.status(404).send('没有找到该用户');
      return res.status(204).send();
    });
  },

  change(req, res) {
    var params = Tool.checkField(req.body, ['name', 'email', 'authority']);
    var admin = req.session.admin;
    Admin.updateWithDate({_id: admin._id}, params, (err, updated) => {
      if(!updated.nModified) res.status(400).send('字段没有修改');
      if(err) return res.status(404).send('没有找到该用户');
      return res.status(204).send();
    });
  },

  changePassword(req, res, next) {
    var params = req.body;
    var admin = req.session.admin;
    if(!params.password) return res.status(400).send('参数错误');
    Admin.findById(admin._id, (err, admin) => {
      if(err) return res.status(404).send('没有找到该用户');
      admin.comparePassword(params.password, (err, isMatch) => {
        if(err) return res.status(400).send('参数错误');
        if(isMatch) return res.status(400).send('字段没有修改');
        admin.password = params.password;
        admin.save((err) => {
          if(err) return res.status(400).send('参数错误');
          next();
        });
      });
    });
  },

  // 查询admin
  fetchAll(req, res) {
    Tool.format(Admin.fetch({}, selectStr), req.params).exec((err, admin) => {
      if(err) return res.send(400, '参数错误');
      return res.status(200).send(admin);
    });
  },

  // 检查登录状态
  isLogin(req, res, next) {
    if(!req.session.admin) {
      return res.status(401).send('未登录');
    }
    next();
  },

  // 检查是否是管理员
  isRoot(req, res, next) {
    var admin = req.session.admin;
    if(!admin) return res.status(401).send('未登录');
    if(admin.authority !== 3) {
      return res.status(403).send('没有权限');
    }
    next();
  },

  // 登录
  login(req,res) {
    var params = req.body;
    if(req.session.admin) return res.status(405).send('你已经登录了');
    Admin.findOne({name: params.name}, (err, admin) => {
      if(err) return res.status(400).send('参数错误');
      if(!admin) return res.status(404).send('没有找到该用户');
      if(!params.password) return res.status(400).send('参数错误');
      admin.comparePassword(params.password, (err, isMatch) => {
        if(err) return res.status(400).send('参数错误');
        if(!isMatch) return res.status(400).send('用户名或密码错误');
        // 设置cookie
        req.session.admin = admin;
        res.cookie('admin', JSON.stringify({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          authority: admin.authority
        })).status(204).send();
      });
    });
  },

  // 登出
  logout(req, res) {
    delete req.session.admin;
    res.cookie('admin', '');
    res.status(204).send();
  }
};
