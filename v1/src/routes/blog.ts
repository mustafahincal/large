import { Blog } from "@prisma/client";
import express from "express";
const router = express.Router();
import blogsController from "../controllers/Blog";

router.route("/").get(blogsController.index).post(blogsController.add);
router.route("/author/:id").get(blogsController.getByAuthor);
router
  .route("/:id")
  .get(blogsController.getById)
  .put(blogsController.update)
  .delete(blogsController.remove);

export default router;
