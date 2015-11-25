const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tool = require('../tool');

const TagSchema = new Schema({
  title: {
    unique: true,
    type: String,
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
tool.rewrite(TagSchema);

//静态方法
tool.statics(TagSchema);

module.exports = mongoose.model('Tag', TagSchema);
