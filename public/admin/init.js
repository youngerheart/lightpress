const Init = /* @ngInject */ ($scope, API, Tool) => {
  $scope.init = {};
  $scope.submit = () => {
    var {name, description, rootName, rootPassword, rootEmail} = $scope.init;
    if(!name || !description || !rootName || !rootPassword || !rootEmail || !$scope.repeatpassword) return;
    if($scope.repeatpassword !== rootPassword) {
      $scope.initErrMsg = '两次输入的密码不一致';
      return;
    } else $scope.initErrMsg = null;
    // 提交表单
    API.init.post({}, $scope.init).then((res) => {
      location.href = '/admin';
    }, () => {
      $scope.initErrMsg = '初始化博客失败';
      $scope.$apply();
    });
  };
};

module.exports = Init;
