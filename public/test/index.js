angular.module('lp-test', [])

.controller('admin', /* @ngInject */ function ($scope, $http) {

  // 获取配置信息
  $http.get('/api/config')
  .success((res) => {});
  // root获取管理员信息
  $http.get('/api/admin')
  .success((res) => {});
  // 获取登录用户信息
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

  $scope.changeconfig = () => {
    var {changeconfigName, changeconfigDescription} = $scope;
    $http({
      method: 'put',
      url: '/api/config'
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.editmin = () => {};

  $scope.deladmin = () => {};

  $scope.changeadmin = () => {};

  $scope.changeadminpassword = () => {};

  $scope.changeadminauth = () => {};

  $scope.login = () => {
    var {loginName, loginPassword} = $scope;
    $http({
      method: 'post',
      url: '/api/login',
      data: {
        name: loginName,
        password: loginPassword
      }
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.logout = () => {
    $http({
      method: 'get',
      url: '/api/logout'
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

})

.run();
