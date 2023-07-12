import httpStatus from "http-status";
import JWT from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { JwtUserPayload } from "../interfaces/auth";

interface RequestJWT extends Request {
  user: JwtUserPayload;
}

class Authentication {
  authenticate(req: RequestJWT, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Please try again!" });
    }
    JWT.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (error, user) => {
        if (error) {
          next({ status: httpStatus.UNAUTHORIZED, message: error.message });
        }
        req.user = user as JwtUserPayload;
        next();
      }
    );
  }
}

export default new Authentication();
