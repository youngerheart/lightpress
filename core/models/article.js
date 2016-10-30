import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  urlName: {
    type: String,
    required: true
  },
  mdContent: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  },
  publishTime: Date,
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }]
}, {
  timestamps: true
});

dealSchema(ArticleSchema);

export default mongoose.model('config', ArticleSchema);
