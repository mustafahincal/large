import { Blog } from "@prisma/client";
import express from "express";
const router = express.Router();
import blogsController from "../controllers/Blog";
import { errorCatcher } from "../utils/errorCatcher";

router
  .route("/")
  .get(errorCatcher(blogsController.index))
  .post(errorCatcher(blogsController.add));
router.route("/author/:id").get(errorCatcher(blogsController.getByAuthor));
router
  .route("/:id")
  .get(errorCatcher(blogsController.getById))
  .put(errorCatcher(blogsController.update))
  .delete(errorCatcher(blogsController.remove));

export default router;
