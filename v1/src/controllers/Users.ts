import { NextFunction, Request, Response } from "express";
import userService from "../services/User";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";
import { User } from "@prisma/client";

type Key = keyof User;

class UsersController {
  static exclude(user: User, ...keys: Key[]) {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  async index(req: Request, res: Response, next: NextFunction) {
    const users = await userService.list();
    users.map((user) => UsersController.exclude(user, "password"));
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "List of Users",
      data: users,
    });
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userService.get({ id });
    if (!user) throw new CustomError(404, Messages.UserNotFound);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Users listed",
      data: UsersController.exclude(user, "password"),
    });
  }

  async getUserDetails(req:Request,res:Response){
    const {id} = req.params
    const user = await userService.getUserDetails({id})
    if(!user) throw new CustomError(404,Messages.UserNotFound)
    res.status(httpStatus.OK).send({
      status:httpStatus.OK,
      message:"User Found",
      data:UsersController.exclude(user,"password")
    })
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const userCheck = await userService.get({ email });
    if (userCheck) throw new CustomError(409, Messages.UserAlreadyExists);
    const created = await userService.create(req.body);
    res.status(httpStatus.OK).send({
      message: Messages.UserCreatedSuccesfull,
      data: created,
    });
  }

  async patch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const updated = await userService.update({ id }, req.body);
    res.status(httpStatus.OK).send({
      message: Messages.UserUpdatedSuccesfull,
      data: updated,
    });
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await userService.get({ id });

    if (!user) throw new CustomError(404, Messages.UserNotFound);

    const deleted = await userService.delete({ id });
    res.status(httpStatus.OK).send({
      message: Messages.UserDeletedSuccesfull,
      data: deleted,
    });
  }
}

export default new UsersController();
