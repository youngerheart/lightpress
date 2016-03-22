require('./layout.css');
require('./md.css');

const config = require('./../../../config');
const Lang = require('./../../../static')[config.lang ||'zh-cn'];
angular.module('lp', [])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
})
.service('API', require('./../../../public/common/api'))
.service('Tool', require('./../../../public/common/tool'))
.service('Config', () => {return config;})
.service('Lang', () => {return Lang;})
.directive('articleList', require('./components/article-list/index'))
.directive('commentList', require('./components/comment-list'))
.directive('commentBlock', require('./components/comment-block'))
.directive('tagCloud', require('./components/tag-cloud'))
.run();
