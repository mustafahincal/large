import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validator = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      return next();
    }
    const { details } = error;
    const message = details.map((i: any) => i.message).join(",");
    return next(new Error(`Validation: ${message}`));
  };
};

export default validator;
