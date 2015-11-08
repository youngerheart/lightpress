const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const statics = require('../tool').statics;

const SALT_WORK_FACTORY = 10;

const AdminSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required:true
  },
  email: {
    type: String,
    validate: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    required:true
  },
  password: {
    type: String,
    required:true
  },
  authority: {
    type: Number,
    min: 1,
    max: 3,
    required:true
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
AdminSchema.pre('save', function(next) {
  var user = this;
  this.meta = {};
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  //密码加盐
  bcrypt.genSalt(SALT_WORK_FACTORY, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

//实例方法，验证登陆
AdminSchema.methods = {
  comparePassword(_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if(err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  }
};

//静态方法
statics(AdminSchema);

module.exports = mongoose.model('Admin', AdminSchema);

