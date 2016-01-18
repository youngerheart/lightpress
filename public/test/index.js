angular.module('lp-test', [])
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))
.controller('admin', require('./admin'))
.controller('article', require('./article'))
.controller('comment', require('./comment'))
.controller('other', require('./other'))

.run();
