import { NextFunction, Request, Response } from "express";
import followService from "../services/Follow";
import userService from "../services/User";
import httpStatus from "http-status";
import Messages from "../constants/Messages";
import { CustomError } from "../utils/customError";
import { JwtUserPayload } from "interfaces/auth";

class FollowsControler {
  async index(req: Request, res: Response, next: NextFunction) {
    const follows = await followService.list();
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.FollowsListed,
      data: follows,
    });
  }

  async getFollowings(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userService.get({ id });
    if (!user) throw new CustomError(404, Messages.UserNotFound);

    const follows = await followService.list({
      followerId: id,
    });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.FollowsListed,
      data: follows,
    });
  }

  async getFollowers(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await userService.get({ id });
    if (!user) throw new CustomError(404, Messages.UserNotFound);

    const follows = await followService.list({
      followingId: id,
    });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: Messages.FollowsListed,
      data: follows,
    });
  }

  async follow(req: any, res: Response, next: NextFunction) {
    /* req.user = {
      id: "0d9fc930-126c-45e6-bfb6-1fd314b9d0c9",
      username: "test",
    }; */

    const { id } = req.params;
    const follow = await followService.create({
      follower: { connect: { id: req.user.id } },
      following: { connect: { id: id } },
    });
    res.status(httpStatus.OK).send({
      message: Messages.FollowSuccess,
      data: follow,
    });
  }

  async unfollow(req: any, res: Response, next: NextFunction) {
    const { id } = req.params;
    /* req.user = {
      id: "0d9fc930-126c-45e6-bfb6-1fd314b9d0c9",
      username: "test",
    }; */

    const follow = await followService.get({
      followerId_followingId: {
        followerId: req.user.id,
        followingId: id,
      },
    });
    if (!follow) throw new CustomError(404, Messages.FollowerNotFound);

    await followService.delete({
      followerId_followingId: {
        followerId: req.user.id,
        followingId: id,
      },
    });

    res.status(httpStatus.OK).send({
      message: Messages.UnFollowed,
    });
  }
}

export default new FollowsControler();
