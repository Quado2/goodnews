import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  memberId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  plan: {
    required: true,
    type: String, 
  },
  amount: {
    required: true,
    type: Number,
  },
  date: {
    required: true, 
    type: String
  },
  paidDate: {
    required: true, 
    type: Number
  },
  status:{
    type: String,
    required: true,

  }
});

export const PartnerPayment = mongoose.models.PartnerPayment || mongoose.model("PartnerPayment",PaymentSchema);
