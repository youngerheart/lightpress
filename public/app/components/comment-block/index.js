require('./index.css');
require('./index.html');

var commentBlock = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    scope: {article: '@', id: '@'},
    templateUrl: '/static/public/app/components/comment-block/index.html',
    link: ($scope, $el) => {
      $scope.form = {};
      API.comment.get({article: $scope.article}).then((res) => {
        $scope.comments = res;
        $scope.$apply();
      });
      $scope.keySend = (id) => {
        if (event.ctrlKey && event.keyCode == 13) {
          event.preventDefault();
          var {name, content} = $scope.form;
          API.comment.post({}, {article: $scope.id, name, content}).then((res) => {
            var {name, content} = res.data;
            res.name = name;
            res.content = content;
            $scope.comments.push(res);
          });
        }
      };
    }
  };
};

module.exports = commentBlock;
