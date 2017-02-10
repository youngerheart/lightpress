new Vue({
  el: '#init',
  data() {
    return {
      form: {
        blogName: '',
        blogDesc: '',
        password: '',
        repeatpw: '',
        email: ''
      },
      repeatpw: '',
      rules: {
        blogName: [{required: true, message: 'name is required.', trigger: 'blur'}],
        blogDesc: [{required: true, message: 'descption is required.', trigger: 'blur'}],
        password: [{required: true, message: 'password is required.', trigger: 'blur'}],
        repeatpw: [
          {validator: (rule, value, callback) => {
            if (value === '') callback(new Error('repeat password is required.'));
            else if (value !== this.form.password) callback(new Error('both input are different.'));
            else callback();
          }, trigger: 'blur'}
        ],
        email: [{ required: true, message: 'email is required.', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/init', this.form).then((res) => {
            this.$alert('initialize success.', 'now you can login and start writing.', {
              confirmButtonText: 'ok',
              callback: () => {
                location.href = '/admin/login';
              }
            });
          }, (err) => {
            this.$alert(err.body.message, 'error happend.', {
              confirmButtonText: 'ok',
              type: 'error'
            });
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
});
