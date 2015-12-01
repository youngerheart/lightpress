angular.module('lp-test', [])
.service('API', require('./../common/api'))
.controller('admin', require('./admin'))
.controller('article', require('./article'))

.run();
