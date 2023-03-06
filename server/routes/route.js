import express from "express";
import {
  addAcc,
  check_balance,
  deposit,
  get_all_users,
  transaction_history,
  transfer,
  withdraw,
} from "../controllers/controller.js";

const route = express.Router();

route.post("/addAcc", addAcc);
route.post("/deposit/:id", deposit);
route.post("/withdraw/:id", withdraw);
route.post("/transfer/:id", transfer);
route.get("/statements/:id", transaction_history);
route.get("/balance/:id", check_balance);
route.get("/getusers", get_all_users);

export default route;
