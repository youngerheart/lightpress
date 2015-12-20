const Admin = require('./../schemas/admin');
const Category = require('./../schemas/category');

module.exports = {

  fetchArticle(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchAll(req, res) {
    res.status(405).send('Method Not Allowed');
  }
};
