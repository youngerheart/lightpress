export default {
  baseUrl: ['/article', '/theme', '/tag', '/category'],
  extraUrl: ['/tag', '/category'],
  countUrl: ['/article/_count', '/tag/_count', '/category/_count', '/theme/_count'],
  singleUrl: ['/article/:id', '/theme/:id', '/tag/:id', '/category/:id'],
  tplObj: {
    category: 'list',
    tag: 'list'
  },
  allowFields: ['urlName', 'page', 'limit', 'sort', 'populate', 'search', 'isDraft', 'isRecycled', 'tag', 'category']
};
