require('./index.css');
require('./index.html');

var articleList = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/static/themes/default/app/components/article-list/index.html',
    link: ($scope, $el) => {
      API.article.get({limit: 5})
      .then((res) => {
        $scope.articles = res;
        $scope.$apply();
      });
    }
  };
};

module.exports = articleList;
