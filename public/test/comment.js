const Comment = /* @ngInject */ function ($scope, API, Tool) {
  $scope.edit = () => {
    var {editId, editIp, editName, editContent, editArticle} = $scope;
    if(editId) {
      API.comment.put({
        id: editId
      }, {
        name: editName,
        content: editContent,
      }).then((res) => {
        console.log(res);
      });
    } else {
      API.comment.post({}, {
        ip: editIp,
        name: editName,
        content: editContent,
        article: editArticle
      }).then((res) => {
        console.log(res);
      });
    }
  };
  $scope.del = () => {
    API.comment.del({
      id: $scope.delId
    }).then((res) => {
      console.log(res);
    });
  };

  $scope.fetchby = () => {
    API.comment.get({
      article: $scope.fetchbyArticle
    }).then((res) => {
      console.log(res);
    });
  };

  $scope.fetchall = () => {
    API.comment.get().then((res) => {
      console.log(res);
    });
  };
};

module.exports = Comment;
