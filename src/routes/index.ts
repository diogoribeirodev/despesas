import { Router } from "express";
import authRouter from "./auth";
import expenseRouter from "./expenses";
import userRouter from "./user";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/expenses", expenseRouter);

export default router;
