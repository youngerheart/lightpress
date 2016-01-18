require('./layout.css');

angular.module('lp', [])
.service('API', require('./../common/api'))
.service('Tool', require('./../common/tool'))

.run();
