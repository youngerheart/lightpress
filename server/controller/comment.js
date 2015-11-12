const Admin = require('./../schemas/admin');
const Comment = require('./../schemas/comment');

module.exports = {

  add(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  del(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchByArticle(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchAll(req, res) {
    res.send(405, 'Method Not Allowed');
  }
};
