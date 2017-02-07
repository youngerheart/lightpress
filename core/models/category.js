import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  urlName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

dealSchema(CategorySchema);

export default mongoose.model('config', CategorySchema);
