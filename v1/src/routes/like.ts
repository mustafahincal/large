import express from "express";
const router = express.Router();
import likeController from "../controllers/Likes";

router.route("/").get(likeController.index);
router
  .route("/:blogId&:userId")
  .post(likeController.like)
  .delete(likeController.unlike);

export default router;
