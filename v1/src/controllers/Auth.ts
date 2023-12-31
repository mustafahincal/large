import { UserLoginRequest } from "./../interfaces/auth";
import { Prisma, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import UserService from "../services/User";
import { hashPassword } from "../utils/helpers";
import httpStatus from "http-status";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user: User | null = await UserService.get({ email });
    if (!user) throw new Error("User not found");
    if (!(user.password === hashPassword(password)))
      throw new Error("Password is wrong");

    res.status(httpStatus.OK).send({
      message: "Login Successfull",
      data: {
        access_token: generateAccessToken({
          id: user.id.toString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          ROLE: user.role,
        }),
        refresh_token: generateRefreshToken({
          id: user.id.toString(),
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          ROLE: user.role,
        }),
      },
    });
  }

  async handleSuccessfullAuth(req: Request, res: Response, next: NextFunction) {
    console.log(req.user);
    console.log(req);
    res.redirect("http://localhost:3000");
  }
}

export default new AuthController();
