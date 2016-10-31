new Vue({
  el: '#login',
  data() {
    return {
      form: {
        password: ''
      },
      rules: {
        password: [{required: true, message: 'password is required.', trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/login', this.form).then((res) => {
            location.href = '/admin/articles';
          }, (err) => {
            this.$alert(err.body.message, 'error happend.', {
              confirmButtonText: 'ok',
              type: 'error'
            });
          });
        }
      });
    }
  }
});
