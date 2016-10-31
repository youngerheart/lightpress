import mongoose from 'mongoose';
import {dealSchema} from '../services/tools';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  urlName: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

dealSchema(CategorySchema);

export default mongoose.model('category', CategorySchema);
