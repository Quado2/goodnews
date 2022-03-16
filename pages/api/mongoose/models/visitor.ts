import mongoose from "mongoose";
const Schema = mongoose.Schema;

const visitorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
export const Visitor = mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);


