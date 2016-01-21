const url = {
  config: '/api/config',
  init: '/api/init',
  admin: '/api/admin',
  password: '/api/admin/password',
  login: '/api/login',
  logout: '/api/logout',
  article: '/api/article/:id/:type/:title',
  category: '/api/category/:id',
  tag: '/api/tag/:id',
  comment: '/api/comment/:id/:article'
};

const APISDK = require('restfulapi-sdk');
const API = new APISDK(url, { cache: true });
module.exports = () => {return API;};
