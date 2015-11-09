const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statics = require('../tool').statics;

const ArticleSchema = new Schema({
  title: {
    unique: true,
    type: String
  },
  category: {
    type: String,
    required:true
  },
  tag: {
    type: Array
  },
  author: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// 重写save方法
ArticleSchema.pre('save', function(next) {
  this.meta = {};
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

//静态方法
statics(ArticleSchema);

module.exports = mongoose.model('Article', ArticleSchema);
