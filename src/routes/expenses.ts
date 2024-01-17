import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  getPublicExpense,
  updateExpense,
} from "../controllers/expenses";
import { authMiddleware } from "../middlewares/auth";

const expenseRouter = Router();

expenseRouter.use(authMiddleware);
expenseRouter.get("/:id", getExpense);
expenseRouter.get("/", getExpenses);
expenseRouter.post("/", createExpense);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
