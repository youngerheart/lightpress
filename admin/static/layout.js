_lp = {
  getRule: (name, type) => [{type: type || 'string', required: true, message: `${name} is required.`, trigger: 'blur'}],
  getUrlParams: (key) => {
    var params = {};
    location.search.replace('?', '').split('&').forEach((item) => {
      var map = item.split('=');
      params[map[0]] = map[1];
    });
    if (key) return params[key];
    return params;
  }
};

new Vue({
  el: '#topbar',
  data: function() {
    return {};
  },
  methods: {
    handleSelect(key) {
      location.href = `/admin/${key}`;
    }
  }
});
