import { Blog } from "@prisma/client";
import express from "express";
const router = express.Router();
import blogsController from "../controllers/Blog";

router.route("/").get(blogsController.index).post(blogsController.add);

export default router;
