const Config = require('./../schemas/config');
const Admin = require('./../schemas/admin');

module.exports = {

  isEmpty(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  init(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  change(req, res) {
    res.send(405, 'Method Not Allowed');
  }
};
