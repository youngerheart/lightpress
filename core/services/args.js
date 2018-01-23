export default {
  baseUrl: ['/article', '/theme', '/tag', '/category', '/comment'],
  extraUrl: ['/tag', '/category'],
  countUrl: ['/article/_count', '/tag/_count', '/category/_count', '/theme/_count', '/comment/_count'],
  singleUrl: ['/article/:id', '/theme/:id', '/tag/:id', '/category/:id', '/comment/:id'],
  tplObj: {
    category: 'list',
    tag: 'list'
  },
  allowFields: ['urlName', 'page', 'limit', 'sort', 'populate', 'search', 'isDraft', 'isRecycled', 'tag', 'category'],
  mailValidate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
};
