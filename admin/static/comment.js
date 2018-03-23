new Vue({
  el: '#comment',
  data() {
    return {
      currentPage: 1,
      activeIndex: -1
    };
  },
  created() {
    var params = _lp.getUrlParams();
    this.currentPage = parseInt(params.page) || 1;
  },
  methods: {
    setUrlParams: _lp.setUrlParams,
    handlePageChange(val) {
      this.setUrlParams({page: val});
    },
    toggleItem(index) {
      if (index === this.activeIndex) this.activeIndex = -1;
      else this.activeIndex = index;
    },
    clickDel(id) {
      this.$confirm('delete this comment?', 'warning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/comment/${id}`).then(() => {
          _lp.setUrlParams();
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    }
  }
});
