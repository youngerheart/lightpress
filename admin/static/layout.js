_lp = {
  urlParams: {},
  getRule: (name, type) => [{type: type || 'string', required: true, message: `${name} is required.`, trigger: 'blur'}],
  getUrlParams: (key) => {
    var paramsStr = location.search.replace('?', '');
    if (!paramsStr) return key ? _lp.urlParams[key] : _lp.urlParams;
    paramsStr.split('&').forEach((item) => {
      var map = item.split('=');
      _lp.urlParams[map[0]] = map[1];
    });
    return key ? _lp.urlParams[key] : _lp.urlParams;
  },
  setUrlParams(obj, isProp) {
    if (!obj) {
      location.search = '';
      return;
    }
    var params = isProp ? _lp.getUrlParams() : obj;
    if (isProp) {
      for (var key in obj) {
        params[key] = obj[key];
      }
    }
    location.search = '?' + Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  },
  setData: (form, data, extra = {}) => {
    var check = (data) => data && typeof data === 'object' ? data._id : data;
    for (var key in form) {
      if (Array.isArray(data[key])) form[key] = data[key].map(check);
      else if (extra[key]) {
        form[key] = new extra[key](data[key]);
      } else form[key] = check(data[key]);
    }
  }
};

new Vue({
  el: '#topbar',
  data: function() {
    return {};
  },
  methods: {
    handleSelect(key) {
      location.href = `/admin/${key || 'article'}`;
    }
  }
});
