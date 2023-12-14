import { RequestHandler } from "express";
import { CertifyAccessToken } from "../utils/authenticate";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers["authorization"]; // req.headers['x-access-token'];

  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const bearer = accessToken.split(" ");
    const bearerToken = bearer[1];

    const result = CertifyAccessToken(bearerToken);
    req.body = result;

    return next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};
