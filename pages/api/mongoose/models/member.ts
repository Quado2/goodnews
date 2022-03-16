
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    index: {unique: true, dropDups: true},
    dropDups: true,
  },
 
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

export const Member =
  mongoose.models.Member || mongoose.model("Member", MemberSchema);
