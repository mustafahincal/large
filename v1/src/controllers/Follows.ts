import { NextFunction, Request, Response } from "express";
import followService from "../services/Follow";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";
import { JwtUserPayload } from "interfaces/auth";

class FollowsControler {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const follows = await followService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: Messages.FollowsListed,
        data: follows,
      });
    } catch (err) {
      next(err);
    }
  }

  async getFollowings(req: Request, res: Response, next: NextFunction) {
    const { followerId } = req.params;
    try {
      const follows = await followService.list({
        followerId,
      });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: Messages.FollowsListed,
        data: follows,
      });
    } catch (err) {
      next(err);
    }
  }

  async getFollowers(req: Request, res: Response, next: NextFunction) {
    const { followingId } = req.params;
    try {
      const follows = await followService.list({
        followingId,
      });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: Messages.FollowsListed,
        data: follows,
      });
    } catch (err) {
      next(err);
    }
  }

  async follow(req: Request, res: Response, next: NextFunction) {
    try {
      const { followerId, followingId } = req.params;
      const follow = await followService.create({
        follower: { connect: { id: followerId } },
        following: { connect: { id: followingId } },
      });
      res.status(httpStatus.OK).send({
        message: Messages.FollowSuccess,
        data: follow,
      });
    } catch (err) {
      next(err);
    }
  }

  async unfollow(req: Request, res: Response, next: NextFunction) {
    const { followerId, followingId } = req.params;
    try {
      const follow = await followService.get({
        followerId,
        followingId,
      });
      if (!follow) throw new CustomError(404, Messages.FollowerNotFound);

      await followService.delete({
        followerId_followingId: {
          followerId,
          followingId,
        },
      });

      res.status(httpStatus.OK).send({
        message: Messages.UnFollowed,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new FollowsControler();