import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const TagSchema = new Schema({});

dealSchema(TagSchema);

export default mongoose.model('tag', TagSchema);
