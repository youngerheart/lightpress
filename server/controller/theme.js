const fs = require('fs');
const Config = require('./../schemas/config');

module.exports = {
  add(req, res) {
    Config.findOne({}, (config) => {
      var theme = config.theme ? config.theme : 'default';
      // 从配置中提取，或者取得默认主题
      res.status(200).send();
    });
  },
  del(req, res) {
    res.status(200).send();
  },
  get(req, res) {
    res.status(200).send();
  }
};
