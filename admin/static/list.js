new Vue({
  el: '#list',
  data() {
    return {
      searchText: '',
      currentPage: 1,
      isOpen: false,
      urlName: '',
      form: {
        urlName: '',
        name: ''
      },
      rules: {
        name: _lp.getRule('name'),
        urlName: _lp.getRule('urlName')
      }
    };
  },
  created() {
    var params = _lp.getUrlParams();
    this.searchText = params.search || '';
    this.currentPage = parseInt(params.page) || 1;
  },
  methods: {
    handleSearchClick() {
      if (!this.searchText) this.$message.error('type content is empty');
      else _lp.setUrlParams({search: this.searchText}, true);
    },
    handlePageChange(val) {
      _lp.setUrlParams({page: val});
    },
    openEdit(name, urlName) {
      this.form.name = name;
      this.form.urlName = urlName;
      this.isOpen = true;
      this.urlName = urlName;
    },
    handleDelete(urlName, moduleName) {
      this.$confirm(`delete that ${moduleName}?`, 'warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/${moduleName}/${urlName}`).then(() => {
          location.href = `/admin/${moduleName}`;
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    },
    submitForm(formName, moduleName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$http.put(`/api/${moduleName}/${this.urlName}`, this.form).then(() => {
          location.href = `/admin/${moduleName}`;
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    }
  }
});
