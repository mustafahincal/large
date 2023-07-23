import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma, Section } from "@prisma/client";
import likeService from "../services/Like";

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
      const createdLike = await likeService.create({
        user: { connect: { id: userId } },
        blog: { connect: { id: blogId } },
      });
      res.send({
        message: "blog likedß succesfully",
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
      const like = await likeService.get({ blogId, userId });
      if (!like) {
        res.send({
          message: "blog already unliked",
        });
        return;
      }
      await likeService.delete({ id: like.id });
      res.send({
        message: "blog unliked succesfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new LikesController();
