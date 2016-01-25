const Setting = /* @ngInject */ ($scope, API, Tool) => {
  // 获取站点信息
  API.config.get().then((res) => {
    $scope.config = res;
    $scope.$apply();
  });
  $scope.configSubmit = () => {
    var {name, description} = $scope.config;
    if(!name || !description) return;
    API.config.put({}, {name, description}).then(() => {
      $scope.configErrMsg = '修改站点信息成功';
      $scope.$apply();
    });
  };
};

module.exports = Setting;
