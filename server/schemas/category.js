const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statics = require('../tool').statics;

const CategorySchema = new Schema({
  title: {
    unique: true,
    type: String
  },
  number: {
    type: Number,
    required:true,
    default: 0
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
CategorySchema.pre('save', function(next) {
  this.meta = {};
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

//静态方法
statics(CategorySchema);

module.exports = mongoose.model('Category', CategorySchema);
