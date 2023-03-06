import { Transactions } from "../models/transaction.js";
import { User } from "../models/user.js";

export const addAcc = async (req, res) => {
  try {
    const newAcc = await User.create({
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      mobile: req.body.mobile,
      initialBal: req.body.initialBal,
      address: req.body.address,
      adharNo: req.body.adharNo,
      panNo: req.body.panNo,
    });

    await newAcc.save();
    return res.status(200).json(newAcc);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deposit = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const amount = req.body.amount;

    user.initialBal = user.initialBal + amount;

    const currentbalance = user.initialBal;

    let transactiondetails = {
      transactionType: "Deposit",
      accountNumber: user.accountNumber,
      sender: user.accountNumber,
      transactionAmount: amount,
      currentBalance: currentbalance,
    };

    await user.save();
    const transactionStatement = await Transactions.create(transactiondetails);

    return res.status(200).json(transactionStatement);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const withdraw = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const amount = req.body.amount;

    user.initialBal = user.initialBal - amount;

    const currentbalance = user.initialBal;

    let transactiondetails = {
      transactionType: "Withdraw",
      accountNumber: user.accountNumber,
      sender: user.accountNumber,
      transactionAmount: amount,
      currentBalance: currentbalance,
    };

    await user.save();
    const transactionStatement = await Transactions.create(transactiondetails);

    return res.status(200).json(transactionStatement);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const transfer = async (req, res) => {
  try {
    const sender = await User.findOne({ _id: req.params.id });
    const amount = req.body.amount;
    const reciever = await User.findOne({
      accountNumber: req.body.accountNumber,
    });

    reciever.initialBal = reciever.initialBal + amount;
    sender.initialBal = sender.initialBal - amount;

    let transactiondetails = {
      transactionType: "Transfer",
      accountNumber: reciever.accountNumber,
      sender: sender.accountNumber,
      transactionAmount: amount,
      currentBalance: sender.initialBal,
    };

    await sender.save();
    await reciever.save();

    const transferStatment = await Transactions.create(transactiondetails);
    return res.status(200).json(transferStatment);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const transaction_history = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const userAcc = user.accountNumber;
    const history = await Transactions.find({
      sender: userAcc,
    });

    return res.status(200).json(history);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const check_balance = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const balance = user.initialBal;

    return res.status(200).json(balance);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const get_all_users = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
