import { Router } from "express";
import authRouter from "./auth";
import expenseRouter from "./expenses";
import userRouter from "./user";
import publicRouter from "./public";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/expenses", expenseRouter);
router.use("/public", publicRouter);


export default router;
