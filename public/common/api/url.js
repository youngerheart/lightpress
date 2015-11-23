const url = {
  config: {
    init: 'post /api/init',
    change: 'put /api/config',
    fetch: 'get /api/config'
  },
  admin: {
    add: 'post /api/admin',
    del: 'delete /api/admin',
    change: 'put /api/admin',
    changePassword: 'put /api/admin/password',
    fetch: 'get /api/admin',
    login: 'post /api/login',
    logout: 'get /api/logout'
  },
  article: {
    add: 'post /api/article',
    del: 'delete /api/article/id/:id',
    change: 'put article/id/:id',
    fetch: 'get /article/id/:id'
  },
  category: {
    fetch: '/api/category/:category'
  },
  tag: {
    fetch: '/api/tag/:tag'
  },
  comment: {
    add: 'post /api/comment',
    del: 'delete /api/comment/id/:id',
    fetch: 'get /api/comment/article/:article'
  }
};

module.exports = url;
