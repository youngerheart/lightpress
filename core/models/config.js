import mongoose from 'mongoose';
import {dealSchema} from '../services/tools';
import {mailValidate} from '../services/args';

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
  email: {
    type: String,
    required: true,
    match: mailValidate
  },
  totalTheme: {
    type: Schema.Types.ObjectId,
    ref: 'theme',
    required: true
  }
}, {
  timestamps: true
});

dealSchema(ConfigSchema);

export default mongoose.model('config', ConfigSchema);
