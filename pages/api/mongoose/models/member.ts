import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  sureName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: {unique: true, dropDups: true},
    dropDups: true,
  },
  phone: {
    type: String,
    required: true,
    index: {unique: true, dropDups: true},
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Member =
  mongoose.models.Member || mongoose.model("Member", MemberSchema);
