import { RequestHandler } from "express";
import { db } from "../server/db";

export const DeleteUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  if (req.body.id !== id)
    return res.status(401).json({ error: 401, message: "Unauthorized" });
  try {
    await db.user.delete({ where: { id: id } });
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const GetUser: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  if (req.body.id !== id)
    return res.status(401).json({ error: 401, message: "Unauthorized" });
  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};
