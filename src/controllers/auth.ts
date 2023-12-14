import bycrypt from "bcryptjs";
import { RequestHandler } from "express";
import { db } from "../server/db";
import { insertUserParams } from "../server/db/schema/users";
import { GenerateAccessToken } from "../utils/authenticate";

export const SignupUser: RequestHandler = async (req, res, next) => {
  const result = insertUserParams.safeParse(req.body);
  if (!result.success)
    return res
      .status(400)
      .json({ error: 400, message: result.error.flatten().fieldErrors });
  try {
    await db.user.create({
      data: {
        ...result.data,
        password: bycrypt.hashSync(result.data.password, 8),
      },
    });
    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return next(error);
  }
};

export const SignInUser: RequestHandler = async (req, res, next) => {
  const result = insertUserParams.omit({ name: true }).safeParse(req.body);
  if (!result.success)
    return res
      .status(400)
      .json({ error: 400, message: result.error.flatten().fieldErrors });
  try {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
    });
    if (!user || !bycrypt.compareSync(result.data.password, user.password)) {
      return res.status(404).json({
        error: 404,
        message: "Invalid credentials.",
      });
    }
    const accessToken = GenerateAccessToken({
      name: user.name,
      email: user.email,
      id: user.id,
    });
    return res.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    return next(error);
  }
};
