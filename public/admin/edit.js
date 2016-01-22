const Edit = /* @ngInject */ function ($scope, $location, API, Tool) {
  var title = $location.search().title;
  var id = null;
  if(title) {
    API.article.get({type: 'title', title}).then((res) => {
      // 设置初始值
      id = res._id;
      $scope.title = res.title;
      $scope.content = res.content;
      $scope.category = res.category.title;
      var tags = [];
      res.tag.forEach((item) => {
        tags.push(item.title);
      });
      $scope.tag = tags;
    });
  }
  $scope.categoryMethod = API.category;
  $scope.tagMethod = API.tag;
  $scope.submit = () => {
    var {title, content, category, tag} = $scope;
    if(id) {
      API.article.put({id}, {
        title,
        content,
        category,
        tag
      }).then(() => {
        $location.search('title', title);
        location.search = '?title=' + title;
      });
    } else {
      API.article.post({}, {
        title,
        content,
        category,
        tag
      }).then((res) => {
        id = res._id;
        location.search = '?title=' + title;
      });
    }
  };
};

module.exports = Edit;
