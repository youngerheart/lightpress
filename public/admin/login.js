const Admin = /* @ngInject */ function ($scope, API, Tool) {
  $scope.submit = () => {
    $scope.submited = true;
    var {name, password} = $scope;
    API.login.post({}, {name, password}).then((res) => {
      location.href = '/admin';
    }, (err) => {
      $scope.errMsg = err;
      $scope.$apply();
    });
  };
};

module.exports = Admin;
