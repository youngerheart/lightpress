import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({});

dealSchema(CategorySchema);

export default mongoose.model('config', CategorySchema);
