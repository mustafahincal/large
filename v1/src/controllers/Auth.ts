import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserLoginRequest } from "../interfaces/auth";
import UserService from "../services/User";
import { hashPassword } from "../utils/helpers";
import httpStatus from "http-status";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user: User | null = await UserService.getByEmail(email);
      if (!user) throw new Error("User not found");
      if (!(user.password === hashPassword(password)))
        throw new Error("Password is wrong");

      res.status(httpStatus.OK).send({
        message: "Login Successfull",
        data: {
          access_token: generateAccessToken({
            id: user.id.toString(),
            email: user.email,
          }),
          refresh_token: generateRefreshToken({
            id: user.id.toString(),
            email: user.email,
          }),
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
