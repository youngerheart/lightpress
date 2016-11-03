export default {
  baseUrl: ['/article', '/tag', '/category', '/theme'],
  countUrl: ['/article/_count', '/tag/_count', '/category/_count', '/theme/_count'],
  singleUrl: ['/article/:id', '/tag/:id', '/category/:id', '/theme/:id'],
  tplObj: {
    category: 'list',
    tag: 'list'
  }
};
