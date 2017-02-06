import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({});

dealSchema(ArticleSchema);

export default mongoose.model('config', ArticleSchema);
