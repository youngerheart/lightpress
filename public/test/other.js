const Tool = require('./../tool');

const Other = /* @ngInject */ function ($scope, API) {
  $scope.categories = () => {
    API.category.get()
    .then((res) => {
      console.log(res);
    });
  };

  $scope.categoryArticles = () => {
    API.category.get({
      id: $scope.categoryId
    }).then((res) => {
      console.log(res);
    });
  };

  $scope.tags = () => {
    API.tag.get()
    .then((res) => {
      console.log(res);
    });
  };

  $scope.tagArticles = () => {
    API.tag.get({
      id: $scope.tagId
    }).then((res) => {
      console.log(res);
    });
  };

};

module.exports = Other;
