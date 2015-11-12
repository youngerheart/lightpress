const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tool = require('../tool');

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
tool.rewrite(ConfigSchema);

//静态方法
tool.statics(ConfigSchema);

module.exports = mongoose.model('Config', ConfigSchema);
