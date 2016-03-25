require('./index.html');
require('./index.css');

var commentList = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/static/themes/default/app/components/comment-list/index.html',
    link: ($scope, $el) => {
      // 调用该文章评论
      API.comment.get().then((res) => {
        $scope.comments = res;
        $scope.$apply();
      });
    }
  };
};

module.exports = commentList;
