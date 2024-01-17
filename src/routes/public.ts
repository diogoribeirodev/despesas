import { Router } from "express";

import { getPublicExpense } from "../controllers/expenses";

const publicRouter = Router();

publicRouter.get("/:id", getPublicExpense);

export default publicRouter;