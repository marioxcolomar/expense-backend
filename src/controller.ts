import Expense from "./model";
import { Request, Response } from "express";

/**
 * Endpoint for creating a new expense
 * @param {string} req.body.description description of expense
 * @param {number} req.body.amount amount of expense
 * @param {string} req.body.category category of expense
 */
export const createExpense = async (req: Request, res: Response) => {
  try {
    const newExpense = new Expense({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    });
    const result = await newExpense.save();
    res.status(201).json({
      status: true,
      message: "Expense created successfully",
      data: result,
    });
  } catch (error) {
    const message = '"Error when creating expense';
    console.log(message, error);
    res.status(500).json({
      status: false,
      message,
    });
  }
};

/**
 * Endpoint for updating an existing expense
 * @param {string} req.params.id identifier of existing expense
 * @param {Object} req.body.updates updates to make to existing expense
 */
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id as string;
    const expense = await Expense.updateOne({ _id }, req.body.updates).exec();
    if (!expense) {
      throw new Error(`The expense does not exist`);
    }
    res.status(201).json({
      status: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    const message = "Error when updating expense";
    console.log(message, error);
    res.status(500).json({
      status: false,
      message,
    });
  }
};

/**
 * Endpoint for fetching all expenses
 */
export const findAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find();
    res.status(201).json({
      status: true,
      message: "Expenses retrieved",
      data: expenses,
    });
  } catch (error) {
    const message = "Error when getting expenses";
    console.log(message, error);
    res.status(500).json({
      status: false,
      message,
    });
  }
};

/**
 * Endpoint for deleting an expense
 * @param {string} req.params.id identifier of existing expense
 */
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    await Expense.deleteOne({ _id });
    res.status(201).json({
      status: true,
      message: "Expense deleted",
    });
  } catch (error) {
    const message = "Error when deleting expense";
    console.log(message, error);
    res.status(500).json({
      status: false,
      message,
    });
  }
};
