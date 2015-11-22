const Admin = /* @ngInject */ function ($scope, $http, API) {
  // 获取配置信息
  API.config.fetch()
  .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  // root获取管理员信息
  API.admin.fetch()
  .then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
  // 初始化该博客
  $scope.init = () => {
    var {initName, initDescription, initRootname, initRootemail, initRootpassword} = $scope;
    API.config.init({
      name: initName,
      description: initDescription,
      rootName: initRootname,
      rootEmail: initRootemail,
      rootPassword: initRootpassword
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeconfig = () => {
    var {changeconfigName, changeconfigDescription} = $scope;
    API.config.change({
      name: changeconfigName,
      description: changeconfigDescription
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
    API.admin.login({
      name: loginName,
      password: loginPassword
    }).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.logout = () => {
    API.admin.logout()
    .then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };
};

module.exports = Admin;
