import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: ["Deposit", "Withdraw", "Transfer"],
    },
    accountNumber: {
      type: Number,
      required: "please ensure that the account number exists",
    },
    sender: { type: String },
    description: { type: String },
    transactionAmount: {
      type: Number,
      required: "please enter a transaction amount",
    },
    currentBalance: {
      type: Number,
      required: true,
    },
    transactionTime: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Transactions = mongoose.model("Transactions", transactionSchema);
