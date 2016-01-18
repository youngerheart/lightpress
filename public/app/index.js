require('./layout.css');
angular.module('lp', [])
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.directive('articleList', require('./components/article-list/index'))
.directive('commentList', require('./components/comment-list'))
.directive('tagCloud', require('./components/tag-cloud'))
.run();
