import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const TestimonySchema = new Schema({
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

export const Testimony = mongoose.models.Testimony || mongoose.model("Testimony", TestimonySchema);