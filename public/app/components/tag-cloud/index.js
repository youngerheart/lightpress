require('./index.css');
require('./index.html');

var tagCloud = /* @ngInject */ (API) => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/static/public/app/components/tag-cloud/index.html',
    scope: {type: '@'},
    link: ($scope, $el) => {
      API[$scope.type].get().then((res) => {
        $scope.tags = res;
        $scope.$apply();
      });
    }
  };
};

module.exports = tagCloud;
