import express from "express";
const router = express.Router();
import blogsController from "../controllers/BlogController";

router.route("/").get(blogsController.index).post(blogsController.add);

export default router;
