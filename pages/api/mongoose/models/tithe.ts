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
  isConfirmed: {
    type: Boolean,
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member"
  }

})

export const Tithe = mongoose.models.Tithe || mongoose.model("Tithe",TitheSchema);