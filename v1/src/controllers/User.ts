import { NextFunction, Request, Response } from "express";
import userService from "../services/User";
import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

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
  async add(
    req: Request<Prisma.UserCreateInput>,
    res: Response,
    next: NextFunction
  ) {
    return await userService.create(req.body);
  }
}

export default new UsersController();
