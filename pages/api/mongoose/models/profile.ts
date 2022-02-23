import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
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
  phone: {
    type: String,
    required: true,
    index: {unique: true, dropDups: true},
  },
  address: {
    type: String,
  },
  serviceGroups: {
    type: [String]
  },
  memberId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  }

})

export const Profile = mongoose.models.Profile ||  mongoose.model("Profile", ProfileSchema);




