import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/db.js";
import route from "./routes/route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connection();

app.use(route);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port : ${port}`));
