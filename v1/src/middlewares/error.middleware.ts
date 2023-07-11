import { Request, Response, NextFunction } from "express";

export interface Error {
  status: number;
  message: string;
}

class ErrorHandler {
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    const errStatus = err.status || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).send({
      status: errStatus,
      message: errMsg,
    });
  }

  handleNotFound(req: Request, res: Response, next: NextFunction) {
    const err = {
      status: 404,
      message: "Not Found",
    };
    next(err);
  }
}

export default new ErrorHandler();
