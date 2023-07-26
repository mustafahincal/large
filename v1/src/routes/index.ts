import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import blogRouter from "./blog";
import uploadRouter from "./upload";
import commentRouter from "./comment";
import likeRouter from "./like";
import followRouter from "./follow";

class Router {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
  }
  initializeRoutes() {
    this.router.use("/auth", authRouter);
    this.router.use("/users", userRouter);
    this.router.use("/blogs", blogRouter);
    this.router.use("/follows", followRouter);
    this.router.use("/likes", likeRouter);
    this.router.use("/comments", commentRouter);
    this.router.use("/upload", uploadRouter);

    return this.router;
  }
}

export default new Router();
