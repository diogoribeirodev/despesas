import { Router } from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
