import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { Prisma, Section } from '@prisma/client';
import savedService from '../services/Saved';
import userService from '../services/User';
import blogService from '../services/Blog';
import Messages from '../constants/Messages';

class SavedController {
  async index(req: Request, res: Response, next: NextFunction) {
    const saved = await savedService.list();
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'Saved blogs',
      data: saved,
    });
  }

  async getByUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const saved = await savedService.list({ userId });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: 'saved blogs listed',
      data: saved,
    });
  }

  async save(req: Request, res: Response, next: NextFunction) {
    const { blogId, userId } = req.body;

    const userCheck = await userService.get({ id: userId });
    if (!userCheck) throw new Error('User not found');

    const blogCheck = await blogService.get({ id: blogId });
    if (!blogCheck) throw new Error('Blog not found');

    const saveCheck = await savedService.get({ blogId, userId });
    if (saveCheck) throw new Error('Blog already saved by the user');

    const savedBlog = await savedService.create({
      user: { connect: { id: userId } },
      blog: { connect: { id: blogId } },
    });
    res.send({
      message: Messages.LikeAdded,
      data: {
        id: savedBlog.id,
        userId,
        blogId,
      },
    });
  }

  async unsave(req: Request, res: Response, next: NextFunction) {
    const { blogId, userId } = req.body;

    const userCheck = await userService.get({ id: userId });
    if (!userCheck) throw new Error('User not found');

    const blogCheck = await blogService.get({ id: blogId });
    if (!blogCheck) throw new Error('Blog not found');

    const saved = await savedService.get({ blogId, userId });
    if (!saved) throw new Error('Saved not found');

    await savedService.delete({ id: saved.id });

    res.send({
      message: Messages.LikeRemoved,
    });
  }
}

export default new SavedController();
