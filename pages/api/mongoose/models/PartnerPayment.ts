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
  date: {
    required: true, 
    type: String
  }, 
  status:{
    type: String,
    required: true,

  }
});

export const PartnerPayment = mongoose.models.PartnerPayment || mongoose.model("PartnerPayment",PaymentSchema);
