// 生成调用接口的函数
const $http = (params = {}) => {
  const {method = 'get'， url = '', args = [], defer} = params;
  // if (typeof defer !== 'function') return;
  const urlPrefix = '/api/'
  // 直接调用接口
  const req = new XMLHttpRequest();
  // 根据参数对象生成参数
  const getParamStr = (params) => {
    var paramStr = '';
    for(let key in params) {
      if(!paramStr) paramStr += key + '=' + encodeURI(params[key]);
      else paramStr += '\&' + key + '=' + encodeURI(params[key]);
    }
    return paramStr;
  };
  // 解析url和参数
  const parseUrl = (url, params) => {
    params = JSON.parse(JSON.stringify(params));
    var proto = url.match(/:\w+/g);
    proto && proto.forEach((item) => {
      let key = item.replace(':', '');
      if(params[key] != null) {
        url = url.replace(new RegExp(item ,'g'), params[key].toString());
        delete params[key];
      } else {
        url = url.replace(new RegExp(item + '/?', 'g'), '');
      }
    });
    var paramStr = getParamStr(params);
    return url + (paramStr ? '?' + paramStr : '');
  };
  var realUrl = '';
  req.onreadystatechange = () => {
    if(req.readyState === 4) {
      if(req.status >= 200 && req.status < 300) {
        var res = parse(req.responseText);
        defer(true, res, req.status);
      } else {
        defer(false, parse(req.responseText), req.status);
      }
    }
  };

  var openReq = () => {
    req.open(method, realUrl, true);
    if(method !== 'get') req.setRequestHeader('Content-type', 'application/json');
  };

  switch(args.length) {
    case 0:
      realUrl = urlPrefix + parseUrl(url, {});
      openReq();
      req.send();
      break;
    case 1:
      realUrl = urlPrefix + parseUrl(url, args[0]);
      openReq();
      req.send();
      break;
    case 2:
      realUrl = urlPrefix + parseUrl(url, args[0]);
      openReq();
      req.send(JSON.stringify(args[1]));
      break;
  }
};
