import { Router } from "express";
import { deleteUser, getUser } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
