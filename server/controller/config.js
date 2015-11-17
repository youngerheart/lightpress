const Config = require('./../schemas/config');
const Admin = require('./../schemas/admin');

module.exports = {

  isEmpty(req, res, next) {
    Config.find({}, (err, config) => {
      if(err) return res.status(400).send('参数错误');
      if(config.length) return res.status(405).send('博客已经初始化了');
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
      if(err) return res.status(400).send('参数错误');
      root.save((err) => {
        if(err) return res.status(400).send('参数错误');
        return res.status(204).send();
      });
    }); 
  },

  change(req, res) {
    var params = req.params;
    Config.update({}, params, (err, updated) => {
      if(err) return res.status(404).send('没有找到该用户');
      if(!updated.nModified) return res.status(405).send('字段没有修改');
    });
  },

  fetch(req, res) {
    Config.find({}, (err, config) => {
      if(err) return res.status(400).send('参数错误');
      return res.status(200).send(config[0]);
    });
  }
};
