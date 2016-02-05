require('./index.css');
require('./index.html');

var commentBlock = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    scope: {article: '@'},
    templateUrl: '/static/public/app/components/comment-block/index.html',
    link: ($scope, $el) => {
      API.comment.get({article: $scope.article}).then((res) => {
        $scope.comments = res;
        $scope.$apply();
      });
    }
  };
};

module.exports = commentBlock;
