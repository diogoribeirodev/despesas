import { RequestHandler } from "express";
import { db } from "../server/db";
import {
  expenseIdSchema,
  insertExpenseParams,
} from "../server/db/schema/expenses";

type WhereClause = {
  userId?: string;
  description?: {
    contains: string;
    mode: "insensitive";
  };
  note?: {
    contains: string;
    mode: "insensitive";
  };
  date?: {
    gte?: Date;
    lte?: Date;
  };
  publico?: boolean;
};

export const getExpense: RequestHandler = async (req, res, next) => {
  try {
    const id = expenseIdSchema.parse(parseInt(req.params.id));
    const expense = await db.expense.findUniqueOrThrow({
      where: {
        id: id,
        userId: req.body.user.id,
      },
      include: {
        attachments: true,
      },
    });
    return res.status(200).json({
      expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicExpense: RequestHandler = async (req, res, next) => {
  try {
    const id = expenseIdSchema.parse(parseInt(req.params.id));
    const expense = await db.expense.findUniqueOrThrow({
      where: {
        id: id,
        publico: true,
      },
      include: {
        attachments: true,
      },
    });
    return res.status(200).json({
      expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenses: RequestHandler = async (req, res, next) => {
  const { search, minDate, maxDate, limit, offset, publico } = req.query;
  let user = req.body.user.id;
  const where: WhereClause = {
    userId: user ? user : undefined,
    description: {
      contains: search as string,
      mode: "insensitive",
    },
    note: {
      contains: search as string,
      mode: "insensitive",
    },
    date: {
      gte: minDate ? new Date(minDate as string) : undefined,
      lte: maxDate ? new Date(maxDate as string) : undefined,
    },
  };

  try {
    const expenses = await db.expense.findMany({
      where: where,
      take: parseInt(limit as string, 10) || 10, // defaults to 10
      skip: parseInt(offset as string, 10) || 0, // default offset to 0
      include: {
        attachments: true,
      },
    });
    if (expenses.length === 0) {
      return res.status(404).json({
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

export const createExpense: RequestHandler = async (req, res, next) => {
  try {
    const params = insertExpenseParams.parse(req.body);
    await db.expense.create({
      data: {
        value: params.value,
        date: params.date,
        note: params.note,
        description: params.description,
        category: params.category,
        paid: params.paid,
        paymentMethod: params.paymentMethod,
        publico: params.publico,
        user: {
          connect: {
            id: req.body.user.id,
          },
        },
        attachments: {
          createMany: {
            data:
              (params.attachments &&
                params.attachments.map((attachment) => ({
                  data: attachment.data,
                }))) ||
              [],
          },
        },
      },
    });
    return res.status(201).json({
      message: "Expense created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense: RequestHandler = async (req, res, next) => {
  try {
    const id = expenseIdSchema.parse(parseInt(req.params.id));
    await db.$transaction([
      db.expense.findUniqueOrThrow({
        where: {
          id: id,
          userId: req.body.user.id,
        },
      }),
      db.expense.delete({
        where: {
          id: id,
          userId: req.body.user.id,
        },
      }),
    ]);
    return res.status(200).json({
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateExpense: RequestHandler = async (req, res, next) => {
  try {
    const id = expenseIdSchema.parse(parseInt(req.params.id));
    const params = insertExpenseParams.parse(req.body);
    await db.expense.update({
      where: {
        id: id,
        userId: req.body.user.id,
      },
      data: {
        value: params.value,
        date: params.date,
        note: params.note,
        description: params.description,
        category: params.category,
        paid: params.paid,
        paymentMethod: params.paymentMethod,
        publico: params.publico,
        attachments: {
          createMany: {
            data:
              (params.attachments &&
                params.attachments.map((attachment) => ({
                  data: attachment.data,
                }))) ||
              [],
          },
        },
      },
    });
    return res.status(200).json({
      message: "Expense updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
