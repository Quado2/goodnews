import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const PrayerSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,

  },
  date:{
    required: true,
    type: Number ,
  },
  memberId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  }
})

export const Prayer = mongoose.models.Prayer || mongoose.model("Prayer", PrayerSchema);