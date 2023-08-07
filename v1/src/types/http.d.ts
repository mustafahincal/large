import { Request, Response } from "express";
import { JwtUserPayload } from "interfaces/auth";
declare namespace Express {
  export interface Request {
    user: JwtUserPayload;
  }
  export interface Response {
    user: JwtUserPayload;
  }
}
