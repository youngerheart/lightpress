const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {statics, rewrite} = require('../tool');

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
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
rewrite(ArticleSchema);

//静态方法
statics(ArticleSchema);

module.exports = mongoose.model('Article', ArticleSchema);
