import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler =
  (handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };

export const errorCatcher = (fn: RequestHandler) => asyncHandler(fn);

/* const handler =
  (handler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
 */
/* export const errorCatcher = (fn: RequestHandler) =>
  fn.constructor.name === "AsyncFunction" ? asyncHandler(fn) : handler(fn); */
