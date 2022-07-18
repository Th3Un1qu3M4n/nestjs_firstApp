import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  name: String,
  desc: String,
  qty: Number,
});
