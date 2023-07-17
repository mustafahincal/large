import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import sectionService from "../services/Section";

class SectionsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sections = await sectionService.list();
      res.status(httpStatus.OK).send({
        status: httpStatus.OK,
        message: "List of blogs",
        data: sections,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new SectionsController();
