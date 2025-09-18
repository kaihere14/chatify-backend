import mongoose, { Schema } from "mongoose";

const { model } = mongoose;

const otpUser = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    otp: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      expires: 0, // TTL index will delete the document after expiresAt time
    },
  },
  {
    timestamps: true,
  }
);

export default model("Otp", otpUser);
