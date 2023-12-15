import { RequestHandler } from "express";
import { db } from "../server/db";
import { userIdSchema } from "../server/db/schema/users";

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = userIdSchema.parse(req.params.id);
    if (req.body.user.id !== id)
      return res.status(401).json({ message: "Unauthorized!" });
    await db.user.delete({ where: { id: id } });
    return res.status(200).json({
      message: "User deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const id = userIdSchema.parse(req.params.id);
    if (req.body.user.id !== id)
      return res.status(401).json({ message: "Unauthorized!" });
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
