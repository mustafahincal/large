import JWT from "jsonwebtoken";
import { JwtUserPayload } from "../interfaces/auth";

export const generateAccessToken = (user: JwtUserPayload) =>
  JWT.sign(user, process.env.SECRET_KEY as string, {
    expiresIn: "10h",
  });

export const generateRefreshToken = (user: JwtUserPayload) =>
  JWT.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY as string);
