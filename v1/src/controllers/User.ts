import { NextFunction, Request, Response } from "express";
import userService from "../services/User";
import { Prisma, User } from "@prisma/client";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";

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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.get({ id });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "User",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const userCheck = await userService.get({ email });
      if (userCheck) throw new CustomError(409, Messages.UserAlreadyExists);
      const created = await userService.create(req.body);
      res.status(httpStatus.OK).send({
        message: Messages.UserCreatedSuccesfull,
        data: created,
      });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = await userService.delete({ id });
      res.status(httpStatus.OK).send({
        message: Messages.UserDeletedSuccesfull,
        data: deleted,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
