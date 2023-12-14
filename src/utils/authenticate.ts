import jwt from "jsonwebtoken";
import { UserJWT } from "../server/db/schema/users";

const secret = process.env.JWT_SECRET as string;

export const GenerateAccessToken = (userInfo: UserJWT) => {
  return jwt.sign(userInfo, secret, { expiresIn: "7d" });
};

export const CertifyAccessToken = (token: string) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      throw err;
    }
    return decoded;
  });
};
