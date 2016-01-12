const Admin = require('./../schemas/admin');
const Tag = require('./../schemas/tag');

module.exports = {

  fetchArticle(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchAll(req, res) {
    res.status(405).send('Method Not Allowed');
  }
};
