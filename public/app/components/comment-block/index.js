require('./index.css');
require('./index.html');

var commentBlock = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    scope: {article: '@', id: '@', author: '@'},
    templateUrl: '/static/public/app/components/comment-block/index.html',
    link: ($scope, $el) => {
      $scope.form = {};
      $scope.admin = {};
      API.login.get().then((res) => {
        $scope.isAdmin = res.name === $scope.author;
      });
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
            $scope.$apply();
          });
        }
      };
      $scope.commentDel = (id, index) => {
        if(!confirm('Are you sure?')) return;
        API.comment.del({id}).then(() => {
          $scope.comments.splice(index, 1);
          $scope.$apply();
        });
      };
    }
  };
};

module.exports = commentBlock;
