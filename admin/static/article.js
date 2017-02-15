new Vue({
  el: '#article',
  data() {
    return {
      searchText: '',
      currentPage: 1
    };
  },
  created() {
    var params = _lp.getUrlParams();
    this.searchText = params.search || '';
    this.currentPage = parseInt(params.page) || 1;
  },
  methods: {
    setUrlParams: _lp.setUrlParams,
    handleSearchClick() {
      if (!this.searchText) this.$message.error('type content is empty');
      this.setUrlParams({search: this.searchText}, true);
    },
    handlePageChange(val) {
      this.setUrlParams({page: val});
    },
    checkRecycle(urlName, isRecycled, isDraft) {
      this.$confirm(isRecycled ? 'recover that article?' : 'move article to recycle?', 'warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$http.put(`/api/article/${urlName}`, {isRecycled: !isRecycled}).then(() => {
          _lp.setUrlParams({isRecycled: !isRecycled, isDraft});
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    }
  }
});
