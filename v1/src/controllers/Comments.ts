import { NextFunction, Request, Response } from "express";
import commentService from "../services/Comment";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";

class CommentsController {
  async index(req: Request, res: Response, next: NextFunction) {
    const comments = await commentService.list();
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.CommentsListed,
      data: comments,
    });
  }

  async getByBlog(req: Request, res: Response, next: NextFunction) {
    const { blogId } = req.params;
    const comments = await commentService.list({ blogId });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.CommentListed,
      data: comments,
    });
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const comment = await commentService.get({
      id,
    });
    if (!comment) throw new CustomError(404, Messages.CommentNotFound);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.CommentListed,
      data: comment,
    });
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const comment = await commentService.create(req.body);
    res.status(httpStatus.OK).send({
      message: Messages.CommentAdded,
      data: comment,
    });
  }

  async patch(req:Request,res:Response,next:NextFunction){
    const {id} = req.params
    const comment = await commentService.update({id},req.body)
    res.status(httpStatus.OK).send({
      message:Messages.CommentUpdated,
      data:comment
    })
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const comment = await commentService.get({
      id,
    });
    if (!comment) throw new CustomError(404, Messages.CommentNotFound);
    await commentService.delete({ id });
    res.status(httpStatus.OK).send({
      message: Messages.CommentDeleted,
    });
  }
}

export default new CommentsController();
