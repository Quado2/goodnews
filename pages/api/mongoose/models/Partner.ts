import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
  memberId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    unique: true,
  },
  plan: {
    required: true,
    type: String,
  },
  startDate: {
    required: true,
    type: String,
  },
});

export const Partner =
  mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);
