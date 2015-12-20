const Admin = require('./../schemas/admin');
const Comment = require('./../schemas/comment');

module.exports = {

  add(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  del(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchByArticle(req, res) {
    res.status(405).send('Method Not Allowed');
  },

  fetchAll(req, res) {
    res.status(405).send('Method Not Allowed');
  }
};
