import { Router } from "express";
import { DeleteUser, GetUser } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.get("/:id", GetUser);
userRouter.delete("/:id", DeleteUser);

export default userRouter;
