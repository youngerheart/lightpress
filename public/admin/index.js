require('./layout.css');

angular.module('lp-admin', [])
// .config(($locationProvider) => {
//   $locationProvider.html5Mode(true);
// })
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.directive('editblock', require('./components/editblock'))
.directive('itemsEditblock', require('./components/items-editblock'))
.controller('login', require('./login'))
.controller('list', require('./list'))
.controller('edit', require('./edit'))
.run();
