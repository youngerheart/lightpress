const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statics = require('../tool').statics;

const CommentSchema = new Schema({
  ip: {
    unique: true,
    type: String
  },
  name: String,
  pointer: String,
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
CommentSchema.pre('save', function(next) {
  this.meta = {};
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

//静态方法
statics(CommentSchema);

module.exports = mongoose.model('Category', CommentSchema);
