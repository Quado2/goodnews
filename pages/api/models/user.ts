import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const userSchema = new Schema({
  id: {
    type: String,
    required: true

  },
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);