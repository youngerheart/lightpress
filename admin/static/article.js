new Vue({
  el: '#article',
  data() {
    return {
      searchText: ''
    };
  },
  methods: {
    handleSearchClick() {
      if (!this.searchText) this.$message.error('type content is empty');
    }
  }
});
