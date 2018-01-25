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
    if (!obj || Object.keys(obj).length === 0) {
      location.search = '';
    } else {
      var params = isProp ? _lp.getUrlParams() : obj;
      if (isProp) {
        for (var key in obj) {
          params[key] = obj[key];
        }
      }
      location.search = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
    }

  },
  setData: (form, data, extra = {}) => {
    var check = (data) => data && typeof data === 'object' ? data._id : data;
    for (var key in form) {
      if (Array.isArray(data[key])) form[key] = data[key].map(check);
      else if (extra[key]) {
        form[key] = new extra[key](data[key]);
      } else form[key] = check(data[key]);
    }
  },
  dateFormat(str, date) {
    date = date || new Date();
    var obj = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var key in obj) {
      if (new RegExp('(' + key + ')').test(str)) {
        var replaceStr = RegExp.$1.length === 1 ? obj[key] : ('00' + obj[key]).substr(('' + obj[key]).length);
        str = str.replace(RegExp.$1, replaceStr);
      }
    }
    return str;
  }
};

new Vue({
  el: '#topbar',
  data: function() {
    return {
      topbarVisible: false
    };
  },
  methods: {
    handleSelect(key) {
      location.href = `/admin/${key || 'article'}`;
    },
    logout() {
      this.$confirm('ready for logout?', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$http.get('/api/logout').then(() => {
          location.href = '/admin/login';
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    }
  }
});
