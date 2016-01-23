const List = /* @ngInject */ ($scope, API, Tool) => {
  // 获取文章列表
  API.article.get().then((res) => {
    $scope.list = res;
    $scope.$apply();
  });
  $scope.formatTime = (item) => {
    return Tool.format(item.meta.createAt) + '/' + Tool.format(item.meta.updateAt);
  };
  $scope.del = (id, title, index) => {
    if(confirm('真的要删掉<' + title + '>吗T_T')) {
      API.article.del({id}).then(() => {
        $scope.list.splice(index, 1);
        $scope.$apply();
      });
    }
  };
};

module.exports = List;
