import { NextFunction, Request, Response } from "express";
import commentService from "../services/Comment";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";

class CommentsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const comments = await commentService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: Messages.CommentsListed,
        data: comments,
      });
    } catch (err) {
      next(err);
    }
  }

  async getByBlog(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const comments = await commentService.list({ blogId: id });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: Messages.CommentListed,
        data: comments,
      });
    } catch (err) {
      next(err);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await commentService.create(req.body);
      res.status(httpStatus.OK).send({
        message: Messages.CommentAdded,
        data: comment,
      });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const comment = await commentService.get({
        id,
      });
      if (!comment) throw new CustomError(404, Messages.CommentNotFound);
      await commentService.delete({ id });
      res.status(httpStatus.OK).send({
        message: Messages.CommentDeleted,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CommentsController();
