const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {statics, rewrite} = require('../tool');

const TagSchema = new Schema({
  title: {
    unique: true,
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  article: [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
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
rewrite(TagSchema);

//静态方法
statics(TagSchema);

module.exports = mongoose.model('Tag', TagSchema);
