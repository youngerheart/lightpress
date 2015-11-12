const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {statics, rewrite} = require('../tool');

const CommentSchema = new Schema({
  ip: {
    type: String,
    required: true
  },
  name: String,
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
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
rewrite(CommentSchema);

//静态方法
statics(CommentSchema);

module.exports = mongoose.model('Comment', CommentSchema);
