import express, { Request, Response } from "express";
import Cors from "cors";
import "dotenv/config";
import { db } from "./database";
import {
  createExpense,
  deleteExpense,
  findAllExpenses,
  updateExpense,
} from "./controller";

const app = express();

app.use(Cors({ origin: ["http://localhost:3000"] }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello backend!");
});

try {
  db();
} catch (error) {
  console.log("Error connecting to database", error);
}

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});

app.post("/expense", createExpense);
app.put("/expense/:id", updateExpense);
app.get("/expenses", findAllExpenses);
app.delete("/expense/:id", deleteExpense);
