import bycrypt from "bcryptjs";
import { RequestHandler } from "express";
import { db } from "../server/db";
import { insertUserParams } from "../server/db/schema/users";
import { GenerateAccessToken } from "../utils/authenticate";

export const signUpUser: RequestHandler = async (req, res, next) => {
  try {
    const params = insertUserParams.parse(req.body);
    await db.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: bycrypt.hashSync(params.password, 8),
      },
    });
    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    return next(error);
  }
};

export const signInUser: RequestHandler = async (req, res, next) => {
  try {
    const params = insertUserParams.omit({ name: true }).parse(req.body);
    const user = await db.user.findUnique({
      where: { email: params.email },
    });
    if (!user || !bycrypt.compareSync(params.password, user.password)) {
      return res.status(404).json({
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
