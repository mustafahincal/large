import express from "express";
import userRouter from "./UserRoutes";
import authRouter from "./AuthRoutes";
import blogRouter from "./BlogRoutes";

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
