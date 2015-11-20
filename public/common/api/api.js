var url = angular.copy(require('./url'));

// 基于$http的简单封装
const API = /* @ngInject */ function($http) {
  // 遍历url对象，生成api对象。
  const dealParams = function(url, param) {
    return url;
  };

  const walk = function(obj) {
    for(var key in obj) {
      if(typeof obj[key] === 'object') {
        walk(obj[key]);
      } else if(typeof obj[key] === 'string') {
        var urlArr = obj[key].split(' ');
        obj[key] = (function(urlArr) {
          return function(param) {
            return $http({
              url: dealParams(urlArr[1], param),
              data: param || null,
              method: urlArr[0]
            });
          };
        })(urlArr);
      }
    }
  };
  walk(url);
  return url;
};

module.exports = API;
