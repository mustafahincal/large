import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma, Section } from "@prisma/client";
import likeService from "../services/Like";
import userService from "../services/User";
import blogService from "../services/Blog";
import Messages from "../constants/Messages";

class LikesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const likes = await likeService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Likes",
        data: likes,
      });
    } catch (err) {
      next(err);
    }
  }
  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId, userId } = req.params;

      const userCheck = await userService.get({ id: userId });
      if (!userCheck) throw new Error("User not found");

      const blogCheck = await blogService.get({ id: blogId });
      if (!blogCheck) throw new Error("Blog not found");

      const likeCheck = await likeService.get({ blogId, userId });
      if (likeCheck) throw new Error("Blog already liked by the user");

      const createdLike = await likeService.create({
        user: { connect: { id: userId } },
        blog: { connect: { id: blogId } },
      });
      res.send({
        message: Messages.LikeAdded,
        data: {
          likeId: createdLike.id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async unlike(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId, userId } = req.params;

      const userCheck = await userService.get({ id: userId });
      if (!userCheck) throw new Error("User not found");

      const blogCheck = await blogService.get({ id: blogId });
      if (!blogCheck) throw new Error("Blog not found");

      const like = await likeService.get({ blogId, userId });
      if (!like) throw new Error("Like not found");

      await likeService.delete({ id: like.id });

      res.send({
        message: Messages.LikeRemoved,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new LikesController();
