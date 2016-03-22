require('./layout.css');

const config = require('./../../config');
const Lang = require('./../../static')[config.lang ||'zh-cn'];
angular.module('lp-admin', [])
// .config(($locationProvider) => {
//   $locationProvider.html5Mode(true);
// })
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.service('Config', () => {return config;})
.service('Lang', () => {return Lang;})
.directive('editblock', require('./components/editblock'))
.directive('itemsEditblock', require('./components/items-editblock'))
.controller('login', require('./login'))
.controller('list', require('./list'))
.controller('edit', require('./edit'))
.controller('setting', require('./setting'))
.controller('init', require('./init'))
.run();
