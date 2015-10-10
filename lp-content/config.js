require('babel');

const article = require('./controller/article');
const admin = require('./controller/admin');

exports.app = {
  url: {
    'get': {
      '/article': article.main,
      '/tag': article.tag,
      '/category': article.category,
      '/admin': admin.main,
      '/': article.list
    }
  }
};
