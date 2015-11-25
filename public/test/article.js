const Tool = require('./../tool');

const Article = /* @ngInject */ function ($scope, API) {
  $scope.edit = () => {
    var {editId, editTitle, editContent, editAuthor, editCategory, editTag} = $scope;
    if(editId) {
      API.article.change({
        id: editId,
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory,
        category: editTag
      }).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    } else {
      API.article.add({
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory
      }).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }
  };

  $scope.del = () => {
    API.article.del({
      id: $scope.delId
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.fetchall = () => {
    API.article.del()
    .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.fetchbyid = () => {
    API.article.del({
      id: $scope.fetchbyidValue
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

};

module.exports = Article;
