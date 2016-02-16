require('./layout.css');

angular.module('lp', [])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
})
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.directive('articleList', require('./components/article-list/index'))
.directive('commentList', require('./components/comment-list'))
.directive('commentBlock', require('./components/comment-block'))
.directive('tagCloud', require('./components/tag-cloud'))
.run();
