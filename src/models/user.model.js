import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const { model } = mongoose;

const aiUser = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

aiUser.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

aiUser.methods.passVerify = async function (password) {
  const response = bcrypt.compare(password, this.password);
  return response;
};

export default model("User", aiUser);
