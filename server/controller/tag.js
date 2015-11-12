const Admin = require('./../schemas/admin');
const Tag = require('./../schemas/tag');

module.exports = {

  fetchArticle(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchAll(req, res) {
    res.send(405, 'Method Not Allowed');
  }
};
