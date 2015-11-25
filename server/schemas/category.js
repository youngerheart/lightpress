const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tool = require('../tool');

const CategorySchema = new Schema({
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
Tool.rewrite(CategorySchema);

//静态方法
Tool.statics(CategorySchema);

module.exports = mongoose.model('Category', CategorySchema);
