var editblock = () => {
  return {
    restrict: 'E',
    replace: true,
    template: '<textarea></textarea>',
    link: ($scope, $el) => {
      var simplemde = new SimpleMDE({
        element: $el[0],
        autoDownloadFontAwesome: false
      });
    }
  };
};

module.exports = editblock;
