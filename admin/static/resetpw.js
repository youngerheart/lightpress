new Vue({
  el: '#resetpw',
  data() {
    return {
      form: {
        password: '',
        resetpw: ''
      },
      rules: {
        password: _lp.getRule('password'),
        repeatpw: [
          {validator: (rule, value, callback) => {
            if (value === '') callback(new Error('repeat password is required.'));
            else if (value !== this.form.password) callback(new Error('both input are different.'));
            else callback();
          }, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put(location.pathname.replace('admin', 'api'), this.form).then((res) => {
            this.$alert('reset password success.', 'now you can login and start writing.', {
              confirmButtonText: 'ok',
              callback: () => {
                location.href = '/admin/login';
              }
            });
          }, (err) => {
            this.$message.error(`error happend - ${err.body.message}`);
          });
        }
      });
    }
  }
});
