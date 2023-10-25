import httpStatus from 'http-status';
import JWT from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { JwtUserPayload } from '../interfaces/auth';

class Authentication {
  authenticate(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: 'Please try again!, token failed.' });
    }
    JWT.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (error, user) => {
        if (error) {
          next({ status: httpStatus.UNAUTHORIZED, message: error.message });
        }
        req.user = user as JwtUserPayload;
        next();
      }
    );
  }
}

export default new Authentication();
