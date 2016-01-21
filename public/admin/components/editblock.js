var editblock = () => {
  return {
    restrict: 'E',
    replace: true,
    template: '<textarea ng-keyup="getValue()"></textarea>',
    scope: {content: '=ngModel'},
    link: ($scope, $el) => {
      var simplemde = new SimpleMDE({
        element: $el[0],
        placeholder: '请输入文章内容',
        autoDownloadFontAwesome: false
      });
      simplemde.codemirror.on('change', () => {
        if($scope.content === simplemde.value()) return;
        $scope.content = simplemde.value();
        $scope.$apply();
      });
      $scope.$watch('content', (newVal) => {
        if(newVal !== simplemde.value()) simplemde.value(newVal);
      });
    }
  };
};

module.exports = editblock;
