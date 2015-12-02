const Tool = require('./../tool');

const Admin = /* @ngInject */ function ($scope, API) {
  // 获取配置信息
  API.config.get()
  .cache((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })
  .send((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
  // root获取管理员信息
  API.admin.get()
  .send((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
  // 初始化该博客
  $scope.init = () => {
    var {initName, initDescription, initRootname, initRootemail, initRootpassword} = $scope;
    API.init.post(Tool.notEmpty({
      name: initName,
      description: initDescription,
      rootName: initRootname,
      rootEmail: initRootemail,
      rootPassword: initRootpassword
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeconfig = () => {
    var {changeconfigName, changeconfigDescription} = $scope;
    API.config.put(Tool.notEmpty({
      name: changeconfigName,
      description: changeconfigDescription
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.addadmin = () => {
    var {addadminName, addadminEmail, addadminPassword, addadminAuthority} = $scope;
    API.admin.post(Tool.notEmpty({
      name: addadminName,
      email: addadminEmail,
      password: addadminPassword,
      authority: addadminAuthority
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.deladmin = () => {
    var {deladminId} = $scope;
    API.admin.del(Tool.notEmpty({
      id: deladminId
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeadmin = () => {
    var {changeadminName, changeadminEmail, changeadminAuthority} = $scope;
    API.admin.put(Tool.notEmpty({
      name: changeadminName,
      email: changeadminEmail,
      authority: changeadminAuthority
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.changeadminpassword = () => {
    API.password.put(Tool.notEmpty({
      password: $scope.changeadminpasswordValue,
    })).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.login = () => {
    var {loginName, loginPassword} = $scope;
    API.login.post({}, {
      name: loginName,
      password: loginPassword
    }).send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };

  $scope.logout = () => {
    API.logout.get()
    .send((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  };
};

module.exports = Admin;
