import express from "express";
const router = express.Router();
import commentController from "../controllers/Comments";

router.route("/").get(commentController.index).post(commentController.add);
router
  .route("/:id")
  .get(commentController.getById)
  .delete(commentController.remove);
router.route("/blog/:blogId").get(commentController.getByBlog);

export default router;
