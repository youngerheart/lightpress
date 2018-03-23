// 生成调用接口的函数
const $http = (params = {}, resolve = () => {}, reject = () =>{}) => {
  const {method = 'get', url = '', query, data} = params;
  const urlPrefix = '/api/'
  // 直接调用接口
  const req = new XMLHttpRequest();
  // 尝试解析json
  const parse = (str) => {
    try {
      str = JSON.parse(str);
    } catch(e) {
      // this is a normal String
    }
    return str;
  };
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
  const parseUrl = (url, params = {}) => {
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
        resolve(res, req.status);
      } else {
        reject(parse(req.responseText), req.status);
      }
    }
  };

  var openReq = () => {
    req.open(method, realUrl, true);
    if(method !== 'get') req.setRequestHeader('Content-type', 'application/json');
  };
  if(data) {
    realUrl = urlPrefix + parseUrl(url, query);
    openReq();
    req.send(JSON.stringify(data));
  } else if(query) {
    realUrl = urlPrefix + parseUrl(url, query);
    openReq();
    req.send();
  } else {
    realUrl = urlPrefix + parseUrl(url, {});
    openReq();
    req.send();
  }
};

var commentform = document.querySelector('#commentform');

commentform.onsubmit = function() {
  const [nickname, email, belong, content] = this.elements;
  var data = {
    nickname: nickname.value,
    email: email.value,
    belong: belong.value,
    content: content.value
  };
  $http({
    method: 'post',
    url: 'comment',
    data
  }, (res) => {
    var newText = document.createElement('div');
    var commentEl = document.querySelector("#comment");
    newText.innerHTML = `<dl>\
      <dt>${data.nickname}</dt><dd>(${res.extra.ip})</dd>\
      </dl>\
      <dl>${data.content}</dl>`;
    commentEl.insertBefore(newText, commentEl.firstChild);
  }, (res) => {
  });
  return false;
}

document.querySelector('#comment').onclick = function(el) {
  var textEl = document.querySelector('#commentform textarea');
  if(!el.target.hasAttribute('replybtn')) return;
  textEl.value = `${textEl.value}@${el.target.innerHTML} `;
  setTimeout(() => {
    textEl.focus();
    textEl.selectionStart = textEl.selectionEnd = textEl.value.length;
  });
}
