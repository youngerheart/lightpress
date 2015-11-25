angular.module('lp-test', [])
.service('API', require('./../common/api/api'))
.controller('admin', require('./admin'))
.controller('article', require('./article'))

.run();
