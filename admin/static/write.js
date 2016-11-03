Vue.component('markdown-editor', {
  props: {
    previewClass: String,
    value: String,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.initialize();
  },
  watch: {
    value(val) {
      var value = this.simplemde.value();
      if (val && !value) this.simplemde.value(val);
    }
  },
  methods: {
    initialize() {
      let configs = {};
      configs.element = this.$el.firstChild;
      configs.initialValue = this.value;
      // 实例化编辑器
      this.simplemde = new SimpleMDE(configs);
      // 添加自定义 previewClass
      const className = this.previewClass || '';
      this.addPreviewClass(className);
      // 绑定输入事件
      this.simplemde.codemirror.on('change', () => {
        this.$emit('input', this.simplemde.value());
        this.dispatch('ElFormItem', 'el.form.change');
      });
      this.simplemde.codemirror.on('blur', () => {
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur');
        }
      });
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    addPreviewClass(className) {
      const wrapper = this.simplemde.codemirror.getWrapperElement();
      const preview = document.createElement('div');
      wrapper.nextSibling.className += ` ${className}`;
      preview.className = `editor-preview ${className}`;
      wrapper.appendChild(preview);
    }
  },
  destroyed() {
    this.simplemde.toTextArea();
    this.simplemde = null;
  },
  template: '<div class="markdown-editor el-textarea__inner"><textarea></textarea></div>'
});

new Vue({
  el: '#write',
  data() {
    return {
      articleForm: {
        title: '',
        mdContent: '',
        urlName: '',
        htmlContent: '',
        category: '',
        tag: [],
        isDraft: false,
        headImgUrl: '',
        publishTime: new Date()
      },
      categoryForm: {
        name: '',
        urlName: ''
      },
      tagForm: {
        name: '',
        urlName: ''
      },
      articleRules: {
        title: _lp.getRule('title'),
        mdContent: _lp.getRule('content'),
        urlName: _lp.getRule('urlName'),
        category: _lp.getRule('category'),
        publishTime: _lp.getRule('publishTime', 'date')
      },
      categoryRules: {
        name: _lp.getRule('name'),
        urlName: _lp.getRule('urlName')
      },
      tagRules: {
        name: _lp.getRule('name'),
        urlName: _lp.getRule('urlName')
      },
      categories: [],
      tags: [],
      isCategoryOpen: false,
      isTagOpen: false,
      totalArticle: _lp.getUrlParams('article'),
      errMsg: ''
    };
  },
  created() {
    this.getData('tag');
    this.getData('category');
    if (this.totalArticle) {
      this.$http.get(`/api/article/${this.totalArticle}`).then((res) => {
        _lp.setData(this.articleForm, res.body, {publishTime: Date});
      }, (err) => {
        this.errMsg = err.body.message;
      });
    }
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (formName === 'articleForm') this.articleForm.htmlContent = this.simplemde.markdown(this.articleForm.mdContent);
        if (!valid) return;
        var moduleName = formName.replace('Form', '');
        var isPut = this.totalArticle && moduleName === 'article';
        this.$http[isPut ? 'put' : 'post'](`/api/${moduleName}${isPut ? `/${this[formName].urlName}` : ''}`, this[formName])
        .then(() => {
          switch (formName) {
            case 'categoryForm':
              this.isCategoryOpen = false;
              this.getData('category');
              break;
            case 'tagForm':
              this.isTagOpen = false;
              this.getData('tag');
              break;
            case 'articleForm':
              this.$message({
                message: 'publish succeed',
                type: 'success'
              });
              break;
          }
        }, (err) => {
          this.$message.error(`error happend - ${err.body.message}`);
        });
      });
    },
    getData(moduleName) {
      this.$http.get(`/api/${moduleName}`).then((res) => {
        var pointer = {
          category: 'categories',
          tag: 'tags'
        };
        this[pointer[moduleName]] = res.body;
      }, (err) => {
        this.$message.error(`error happend - ${err.body.message}`);
      });
    }
  }
});
