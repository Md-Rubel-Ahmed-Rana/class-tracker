import { config } from "../config/envConfig";
import { IJwtPayload } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";

export const generateToken = (payload: IJwtPayload) => {
  const token = jwt.sign(payload, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpire,
  });
  return token;
};
