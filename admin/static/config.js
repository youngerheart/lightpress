new Vue({
  el: '#config',
  data() {
    return {
      configForm: {
        blogName: '',
        blogDesc: '',
        email: ''
      },
      passwordForm: {
        password: '',
        newPassword: '',
        repeatpw: ''
      },
      configRules: {
        blogName: _lp.getRule('blogName'),
        blogDesc: _lp.getRule('blogDesc'),
        email: _lp.getRule('email')
      },
      passwordRules: {
        password: _lp.getRule('password'),
        newPassword: [
          {validator: (rule, value, callback) => {
            if (value === '') callback(new Error('repeat password is required.'));
            else if (value === this.passwordForm.password) callback(new Error('new password should be different.'));
            else callback();
          }, trigger: 'blur'}
        ],
        repeatpw: [
          {validator: (rule, value, callback) => {
            if (value === '') callback(new Error('repeat password is required.'));
            else if (value !== this.passwordForm.newPassword) callback(new Error('both input are different.'));
            else callback();
          }, trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    for (var key in this.configForm) {
      this.configForm[key] = this.$refs[key].value;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        var moduleName = formName.replace('Form', '');
        this.$http.put(`/api/${moduleName}`, this[formName]).then(() => {
          if (moduleName === 'password') location.href = '/admin/login';
          else {
            this.$message({
              message: 'edit succeed',
              type: 'success'
            });
          }
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    }
  }
});
