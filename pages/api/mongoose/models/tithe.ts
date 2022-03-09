import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TitheSchema = new Schema({
  amount: {
    required: true,
    type: Number,
  },
  date: {
    required:true,
    type: Number,

  },
  
})