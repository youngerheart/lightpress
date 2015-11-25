const Tool = require('./../tool');

const Admin = /* @ngInject */ function ($scope, API) {
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
    API.config.init(Tool.notEmpty({
      name: initName,
      description: initDescription,
      rootName: initRootname,
      rootEmail: initRootemail,
      rootPassword: initRootpassword
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeconfig = () => {
    var {changeconfigName, changeconfigDescription} = $scope;
    API.config.change(Tool.notEmpty({
      name: changeconfigName,
      description: changeconfigDescription
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.addadmin = () => {
    var {addadminName, addadminEmail, addadminPassword, addadminAuthority} = $scope;
    API.admin.add(Tool.notEmpty({
      name: addadminName,
      email: addadminEmail,
      password: addadminPassword,
      authority: addadminAuthority
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.deladmin = () => {
    var {deladminId} = $scope;
    API.admin.del(Tool.notEmpty({
      id: deladminId
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeadmin = () => {
    var {changeadminName, changeadminEmail, changeadminAuthority} = $scope;
    API.admin.change(Tool.notEmpty({
      name: changeadminName,
      email: changeadminEmail,
      authority: changeadminAuthority
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeadminpassword = () => {
    API.admin.changePassword(Tool.notEmpty({
      password: $scope.changeadminpasswordValue,
    })).then((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

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
