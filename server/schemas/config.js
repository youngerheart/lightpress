const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {statics, rewrite} = require('../tool');

const ConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// 重写save方法
rewrite(ConfigSchema);

//静态方法
statics(ConfigSchema);

module.exports = mongoose.model('Config', ConfigSchema);
