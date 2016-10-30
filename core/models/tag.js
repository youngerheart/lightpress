import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
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

dealSchema(TagSchema);

export default mongoose.model('tag', TagSchema);
