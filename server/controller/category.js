const Admin = require('./../schemas/admin');
const Category = require('./../schemas/category');

module.exports = {

  fetchArticle(req, res) {
    res.send(405, 'Method Not Allowed');
  },

  fetchAll(req, res) {
    res.send(405, 'Method Not Allowed');
  }
};
