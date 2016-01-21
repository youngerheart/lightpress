require('./layout.css');

angular.module('lp-admin', [])
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.directive('editblock', require('./components/editblock'))
.directive('items-editblock', require('./components/items-editblock'))
.controller('login', require('./login'))

.run();
