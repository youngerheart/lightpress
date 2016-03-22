require('./index.css');
require('./index.html');

var itemsEditblock = (Lang) => {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/static/public/admin/components/items-editblock',
    scope: {method: '=', title: '@', value: '=ngModel', method: '='},
    link: ($scope, $el, $attrs) => {
      $scope.Lang = Lang;
      if(!$scope.method) return;
      var muti = typeof $attrs.muti !== 'undefined';
      $scope.required = typeof $attrs.required !== 'undefined';
      $scope.method.get({zero: true}).then((res) => {
        $scope.items = res;
        $scope.$apply();
      });
      if(!$scope.value) $scope.value = muti ? [] : null;
      $scope.itemClick = (title) => {
        if(muti) {
          if($scope.value.indexOf(title) === -1) $scope.value.push(title);
          else $scope.value.splice($scope.value.indexOf(title), 1);
        } else {
          $scope.value = title;
        }
      };
      $scope.addItem = () => {
        if(!$scope.newTitle) return;
        $scope.method.post({}, {title: $scope.newTitle}).then((res) => {
          // 新元素插入数组
          $scope.items.unshift({
            _id: res.id,
            title: $scope.newTitle
          });
        });
      };
      $scope.showFocus = (title) => {
        if(muti) return $scope.value.indexOf(title) !== -1;
        return $scope.value === title;
      };
      $scope.$watch('value', (newVal) => {
        if(!newVal) return;
        if(muti) $scope.isEmpty = newVal.length;
        else $scope.isEmpty = newVal;
      });
    }
  };
};

module.exports = itemsEditblock;
