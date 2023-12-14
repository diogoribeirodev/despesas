import { Router } from "express";
import { SignInUser, SignupUser } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", SignupUser);
authRouter.post("/signin", SignInUser);

export default authRouter;
