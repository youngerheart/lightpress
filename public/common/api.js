const url = {
  config: '/api/config',
  init: '/api/init',
  admin: '/api/admin',
  password: '/api/admin/password',
  login: '/api/login',
  logout: '/api/logout',
  article: '/api/article/:article',
  category: '/api/category/:category',
  tag: '/api/tag/:tag',
  comment: '/api/comment/:id/:article'
};

const APISDK = require('restfulapi-sdk');
const API = new APISDK(url, {});
module.exports = () => {return API;};
