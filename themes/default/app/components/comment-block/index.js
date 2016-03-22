require('./index.css');
require('./index.html');

var commentBlock = /* @ngInject */ (API, Lang) => {
  return {
    restrict: 'E',
    replace: true,
    scope: {article: '@', id: '@', author: '@'},
    templateUrl: '/static/themes/default/app/components/comment-block/index.html',
    link: ($scope, $el) => {
      $scope.Lang = Lang;
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
          API.comment.post({}, {article: $scope.article, name, content}).then((res) => {
            res.name = name;
            res.content = content;
            $scope.form = {};
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
