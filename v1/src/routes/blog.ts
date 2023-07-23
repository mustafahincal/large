import { Blog } from "@prisma/client";
import express from "express";
const router = express.Router();
import blogsController from "../controllers/Blog";

router.route("/").get(blogsController.index).post(blogsController.add);
router
  .route("/:id")
  .get(blogsController.getById)
  .post(blogsController.update)
  .delete(blogsController.remove);

export default router;
