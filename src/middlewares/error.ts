import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { z } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2001":
        return res.status(400).json({
          message: "Record doesn't exist!",
        });
      case "P2002":
        return res.status(400).json({ message: "Record already exists!" });
      default:
        return res.status(400).json({ messsage: err.message });
    }
  }
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      message: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }
  if (err instanceof Error)
    return res.status(500).json({ message: err.message });
};
