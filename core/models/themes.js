import mongoose from 'mongoose';
import {dealSchema} from './../services/tools';

const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  packName: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true
  },
  sourceUrl: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

dealSchema(ThemeSchema);

export default mongoose.model('theme', ThemeSchema);
