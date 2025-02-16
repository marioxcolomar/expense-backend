import { Schema, model } from "mongoose";

export interface IExpense {
  id: string;
  description?: string;
  amount: number;
  category: string;
}

const expenseSchema = new Schema<IExpense>({
  id: { type: String, require: true },
  description: String,
  amount: { type: Number, require: true },
  category: {
    type: String,
    enum: ["OFFICE", "TRAVEL", "MEALS"],
    default: "MEALS",
  },
});

const Expense = model<IExpense>("Expense", expenseSchema);
export default Expense;
