import express from "express";
const router = express.Router();
import likeController from "../controllers/Likes";

router.route("/").get(likeController.index);
router
  .route("/:blogId&:userId")
  .get(likeController.like)
  .delete(likeController.unlike);

router.route("/blog/:blogId").get(likeController.getByBlog);

export default router;
