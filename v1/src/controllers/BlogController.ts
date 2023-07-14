import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import blogService from "../services/BlogService";
import { Prisma } from "@prisma/client";

class BlogsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await blogService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "List of blogs",
        data: blogs,
      });
    } catch (err) {
      next(err);
    }
  }
  async add(
    req: Request<Prisma.BlogCreateInput>,
    res: Response,
    next: NextFunction
  ) {
    return await blogService.create(req.body);
  }
}

export default new BlogsController();
