import mongoose from 'mongoose';
import {dealSchema} from '../services/tools';
import {mailValidate} from '../services/args';

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
  email: {
    type: String,
    match: mailValidate
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
