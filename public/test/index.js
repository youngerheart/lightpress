angular.module('lp-test', [])

.controller('admin', /* @ngInject */ function ($scope, $http) {

  $scope.init = () => {
    var {initName, initDescription, initRootname, initRootemail, initRootpassword} = $scope;
    $http({
      method: 'post',
      url: '/api/init',
      data: {
        name: initName,
        description: initDescription,
        rootName: initRootname,
        rootEmail: initRootemail,
        rootPassword: initRootpassword
      }
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeconfig = () => {};

  $scope.editmin = () => {};

  $scope.deladmin = () => {};

  $scope.changeadmin = () => {};

  $scope.changeadminpassword = () => {};

  $scope.changeadminauth = () => {};

  $scope.login = () => {};

  $scope.logout = () => {};

})

.run();
