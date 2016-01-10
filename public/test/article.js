const Tool = require('./../tool');

const Article = /* @ngInject */ function ($scope, API) {
  $scope.edit = () => {
    var {editId, editTitle, editContent, editAuthor, editCategory, editTag} = $scope;
    if(editId) {
      API.article.put({
        id: editId
      }, {
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory,
        tag: editTag
      }).cache((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    } else {
      API.article.post({}, {
        title: editTitle,
        content: editContent,
        author: editAuthor,
        category: editCategory,
        tag: editTag
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
    API.article.cache().then((res) => {
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
