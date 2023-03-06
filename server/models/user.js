import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      maxLength: 10,
    },
    accountNumber: {
      type: Number,
      default: Math.floor(Math.random() * 10000000) + 1111111,
    },
    initialBal: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: String,
      required: true,
    },
    adharNo: {
      type: Number,
      required: true,
      maxLength: 12,
    },
    panNo: {
      type: String,
      required: true,
      maxLength: 12,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
