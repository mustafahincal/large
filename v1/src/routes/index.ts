import express from "express";
import userRouter from "./user";
import authRouter from "./auth";
import blogRouter from "./blog";

class Router {
  private router: express.Router;
  constructor() {
    this.router = express.Router();
  }
  initializeRoutes() {
    this.router.use("/auth", authRouter);
    this.router.use("/users", userRouter);
    this.router.use("/blogs", blogRouter);
    return this.router;
  }
}

export default new Router();
