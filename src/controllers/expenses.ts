import { RequestHandler } from "express";
import { db } from "../server/db";
import { insertExpenseParams } from "../server/db/schema/expenses";

export const GetExpense: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const expense = await db.expense.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      expense,
    });
  } catch (error) {
    next(error);
  }
};

export const GetExpenses: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const expenses = await db.expense.findMany({
      where: {
        userId: userId,
      },
    });
    if (!expenses) {
      return res.status(404).json({
        error: 404,
        message: "No expenses found.",
      });
    }
    return res.status(200).json({
      expenses,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateExpense: RequestHandler = async (req, res, next) => {
  const userId = req.body.id;
  const result = insertExpenseParams.safeParse(req.body);
  if (!result.success)
    return res
      .status(400)
      .json({ error: 400, message: result.error.flatten().fieldErrors });
  try {
    const expense = await db.expense.create({
      data: {
        value: result.data.value,
        date: result.data.date,
        note: result.data.note,
        description: result.data.description || "",
        category: result.data.category || "",
      },
    });
    return res.status(201).json({
      expense,
    });
  } catch (error) {
    next(error);
  }
};
