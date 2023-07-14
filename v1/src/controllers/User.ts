import { NextFunction, Request, Response } from "express";
import userService from "../services/User";
import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";
import Messages from "../constants/Messages";

class UsersController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "List of Users",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const userCheck = await userService.getByEmail(req.body.email);
      if (userCheck) throw new Error(Messages.UserAlreadyExists);
      const created = await userService.create(req.body);
      res.status(httpStatus.OK).send({
        message: Messages.UserCreatedSuccesfull,
        data: created,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
