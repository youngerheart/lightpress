const Admin = /* @ngInject */ ($scope, API, Tool) => {
  $scope.submit = () => {
    $scope.errMsg = '';
    var {name, password} = $scope;
    if(!name || !password) return;
    API.login.post({}, {name, password}).then((res) => {
      location.href = '/admin';
    }, (err) => {
      $scope.errMsg = err;
      $scope.$apply();
    });
  };
};

module.exports = Admin;
