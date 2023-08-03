import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma, Section } from "@prisma/client";
import blogService from "../services/Blog";
import sectionService from "../services/Section";
import userService from "../services/User";

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

  async getByAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blogs = await blogService.list({ authorId: id });
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
      if (!blog) throw new Error("Blog not found");

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
      const userCheck = await userService.get({ id: rest.authorId });

      if (!userCheck) throw new Error("User not found");

      const createdBlog = await blogService.create(rest);

      const sectionsToAdd = sections.map((section: Section) => ({
        ...section,
        blogId: createdBlog.id,
      }));

      if (sectionsToAdd.length > 0)
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
      await blogService.update(id, rest);

      if (sections && Array.isArray(sections)) {
        await sectionService.updateMany(
          { blogId: id },
          sections as Prisma.SectionUncheckedUpdateManyInput
        );
      }

      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "Blog updated",
      });
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await blogService.delete({ id });
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
