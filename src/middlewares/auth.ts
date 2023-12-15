import { RequestHandler } from "express";
import { CertifyAccessToken } from "../utils/authenticate";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers["authorization"]; // req.headers['x-access-token'];

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const bearer = accessToken.split(" ");
    const bearerToken = bearer[1];

    const result = CertifyAccessToken(bearerToken);
    req.body.user = result;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
