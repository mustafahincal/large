import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import blogService from "../services/blog.service";

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
}

export default new BlogsController();
