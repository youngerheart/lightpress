import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const ConfigSchema = new Schema({});

dealSchema(ConfigSchema);

export default mongoose.model('config', ConfigSchema);
