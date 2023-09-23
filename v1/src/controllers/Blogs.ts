import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma, Section } from "@prisma/client";
import blogService from "../services/Blog";
import sectionService from "../services/Section";
import userService from "../services/User";

enum Role {
  MEMBER,
  AUTHOR,
  ADMIN,
  MODERATOR,
}

class BlogsController {
  async index(req: Request, res: Response, next: NextFunction) {
    const blogs = await blogService.list();
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "List of blogs",
      data: blogs,
    });
  }

  async getByAuthor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const blogs = await blogService.list({ authorId: id });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "List of blogs",
      data: blogs,
    });
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const blog = await blogService.get({ id });
    if (!blog) throw new Error("Blog not found");

    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Blog found",
      data: blog,
    });
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const { sections, ...rest } = req.body;
    const userCheck = await userService.get({ id: rest.authorId });

    if (!userCheck) throw new Error("User not found");

    if (Role[userCheck.role as keyof typeof Role] === Role.MEMBER)
      throw new Error("User is not allowed to create blogs");

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
  }

  async update(req: Request, res: Response, next: NextFunction) {
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
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    await blogService.delete({ id });
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "Blog deleted",
    });
  }
}

export default new BlogsController();
