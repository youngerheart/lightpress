const Tool = require('./../tool');

const Article = /* @ngInject */ function ($scope, API) {
  $scope.edit = () => {
    var {editId, editTitle, editContent, editAuthor, editCategory, editTag} = $scope;
    if(editId) {
      API.article.put({
        id: editId,
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory,
        category: editTag
      }).send((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    } else {
      API.article.post({
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory
      }).send((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }
  };

  $scope.del = () => {
    API.article.del({
      id: $scope.delId
    }).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.fetchall = () => {
    API.article.get()
    .send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.fetchbyid = () => {
    API.article.del({
      id: $scope.fetchbyidValue
    }).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

};

module.exports = Article;
