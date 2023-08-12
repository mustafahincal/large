import express from "express";
const router = express.Router();
import commentController from "../controllers/Comments";
import { errorCatcher } from "../utils/errorCatcher";

router
  .route("/")
  .get(errorCatcher(commentController.index))
  .post(errorCatcher(commentController.add));
router
  .route("/:id")
  .get(errorCatcher(commentController.getById))
  .delete(errorCatcher(commentController.remove));
router.route("/blog/:blogId").get(errorCatcher(commentController.getByBlog));

export default router;
