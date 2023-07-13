import express from "express";
const router = express.Router();
import blogsController from "../controllers/blog.controller";

router.route("/").get(blogsController.index).post(blogsController.add);

export default router;
