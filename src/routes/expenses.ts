import { Router } from "express";
import { GetExpense, GetExpenses } from "../controllers/expenses";
import { authMiddleware } from "../middlewares/auth";

const expenseRouter = Router();

expenseRouter.use(authMiddleware);
expenseRouter.get("/:id", GetExpense);
expenseRouter.get("/", GetExpenses);

export default expenseRouter;
