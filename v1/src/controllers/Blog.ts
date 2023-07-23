import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma, Section } from "@prisma/client";
import blogService from "../services/Blog";
import sectionService from "../services/Section";

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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await blogService.get({ id });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Blog found",
        data: blog,
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
    try {
      const { sections, ...rest } = req.body;
      const createdBlog = await blogService.create(rest);

      const sectionsToAdd = sections.map((section: Section) => ({
        ...section,
        blogId: createdBlog.id,
      }));

      await sectionService.createMany(sectionsToAdd);

      res.send({
        message: "blog added succesfully",
        data: {
          blogId: createdBlog.id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { sections, ...rest } = req.body;
      const updatedBlog = await blogService.update(id, rest);

      await sectionService.updateMany({ id }, sections);

      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Blog updated",
        data: updatedBlog,
      });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await blogService.delete({ id });
      await sectionService.deleteMany({ blogId: id });
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Blog deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new BlogsController();
