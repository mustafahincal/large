import express from "express";
const router = express.Router();
import likeController from "../controllers/Likes";
import { errorCatcher } from "../utils/errorCatcher";

router.route("/").get(errorCatcher(likeController.index));
router
  .route("/:blogId&:userId")
  .post(errorCatcher(likeController.like))
  .delete(errorCatcher(likeController.unlike));

router.route("/blog/:blogId").get(errorCatcher(likeController.getByBlog));

export default router;
