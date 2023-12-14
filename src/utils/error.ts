import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2001":
        return res.status(400).json({
          error: err.code,
          message: "Record doesn't exist!",
        });
      case "P2002":
        return res
          .status(400)
          .json({ error: err.code, message: "Record already exists!" });
      default:
        return res.status(400).json({ code: err.code, messsage: err.message });
    }
  }
  if (err instanceof Error)
    return res.status(500).json({ error: "Something went wrong." });
};
