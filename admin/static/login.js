new Vue({
  el: '#login',
  data() {
    return {
      loginForm: {
        password: ''
      },
      resetpwmailForm: {
        email: ''
      },
      loginRules: {
        password: _lp.getRule('password')
      },
      resetpwmailRules: {
        email: _lp.getRule('email')
      },
      isDialogOpen: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(`/api/${formName.replace('Form', '')}`, this[formName]).then((res) => {
            if (formName === 'loginForm') location.href = '/admin/article';
            else this.$message('email already send, please check your mailbox');
          }, (err) => {
            this.$message.error(`error happend - ${err.body.message}`);
          });
        }
      });
    }
  }
});
