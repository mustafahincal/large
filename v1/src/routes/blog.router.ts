import express from "express";
const router = express.Router();
import BlogsController from "../controllers/blog.controller";

router.route("/").get(BlogsController.index);

export default router;
