const Config = require('./../schemas/config');
const Admin = require('./../schemas/admin');

module.exports = {

  isEmpty(req, res, next) {
    Config.find({}, (err, config) => {
      if(err) return res.send(400, '参数错误');
      if(config.length) return res.send(400, '博客已经初始化了');
      next();
    });
  },

  init(req, res) {
    var params = req.body;
    var config = new Config({
      name: params.name,
      description: params.description,
    });
    var root = new Admin({
      authority: 3,
      name: params.rootName,
      email: params.rootEmail,
      password: params.rootPassword
    });

    config.save((err) => {
      if(err) return res.send(400, '参数错误');
      root.save((err) => {
        if(err) return res.send(400, '参数错误');
        res.send(204);
      });
    }); 
  },

  change(req, res) {
    var params = req.params;
    Config.update({}, params, (err, updated) => {
      if(err) return res.send(404, '没有找到该用户');
      if(!updated.nModified) res.send(400, '字段没有修改');
    });
    res.send(405, 'Method Not Allowed');
  },

  fetch(req, res) {
    Config.find({}, (err, config) => {
      if(err) return res.send(400, '参数错误');
      return res.send(200, config[0]);
    });
  }
};
