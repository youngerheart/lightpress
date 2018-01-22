import mongoose from 'mongoose';
import {dealSchema} from '../services/tools';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userIP: {
    type: String,
    required: true
  },
  nickname: String,
  content: {
    type: String,
    required: true
  },
  reply: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  },
  belong: {
    type: Schema.Types.ObjectId,
    ref: 'article',
    required: true
  }
}, {
  timestamps: true
});

dealSchema(CommentSchema);

export default mongoose.model('comment', CommentSchema);
