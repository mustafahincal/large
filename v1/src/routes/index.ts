import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import blogRouter from "./blog";
import uploadRouter from "./upload";

class Router {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
  }
  initializeRoutes() {
    this.router.use("/auth", authRouter);
    this.router.use("/users", userRouter);
    this.router.use("/blogs", blogRouter);
    this.router.use("/upload", uploadRouter);
    return this.router;
  }
}

export default new Router();
