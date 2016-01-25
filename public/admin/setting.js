const Setting = /* @ngInject */ ($scope, API, Tool) => {
  // 获取站点信息
  API.config.get().then((res) => {
    $scope.config = res;
    $scope.$apply();
  });
  // 获取当前管理员信息
  API.login.get().then((res) => {
    $scope.admin = res;
    $scope.$apply();
  });
  // 修改配置
  $scope.configSubmit = () => {
    var {name, description} = $scope.config;
    if(!name || !description) return;
    API.config.put({}, {name, description}).then(() => {
      $scope.configErrMsg = '修改站点信息成功';
      $scope.$apply();
    });
  };
  // 修改当前管理员信息
  $scope.adminSubmit = () => {
    var {_id, name, email, authority} = $scope.admin;
    API.admin.put({}, {name, email, authority}).then(() => {
      $scope.adminErrMsg = '修改管理员信息成功';
      $scope.$apply();
    });
  };
  // 修改当前管理员密码
  $scope.passwordSubmit = () => {
    var {password, repeatpw} = $scope;
    if(password !== repeatpw) {
      $scope.passwordErrMsg = '密码输入不一致';
      return;
    }
    API.password.put({}, { password }).then(() => {
      alert('修改密码成功，请重新登录');
      location.href = '/admin/login';
    });
  };
};

module.exports = Setting;
