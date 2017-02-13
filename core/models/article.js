import mongoose from 'mongoose';
import {dealSchema} from '../services/tools';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  urlName: {
    type: String,
    required: true,
    unique: true
  },
  mdContent: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  isDraft: {
    type: Boolean,
    required: true,
    default: false
  },
  isRecycled: {
    type: Boolean,
    required: true,
    default: false
  },
  publishTime: {
    type: Date,
    required: true
  },
  headImgUrl: String,
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  views: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

dealSchema(ArticleSchema);

export default mongoose.model('article', ArticleSchema);
