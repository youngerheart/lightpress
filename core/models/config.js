import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
  blogName: {
    type: String,
    required: true
  },
  blogDesc: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  urlById: {
    type: Boolean,
    default: false
  },
  totalTheme: {
    type: Schema.Types.ObjectId,
    ref: 'theme'
  }
}, {
  timestamps: true
});

dealSchema(ConfigSchema);

export default mongoose.model('config', ConfigSchema);
