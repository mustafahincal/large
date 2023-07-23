import express from "express";
const router = express.Router();
import followController from "../controllers/Follows";

router.route("/").get(followController.index);
router.route("/followingId").get(followController.getFollowers);
router.route("/followerId").get(followController.getFollowings);
router
  .route("/:followerId&:followingId")
  .post(followController.follow)
  .delete(followController.unfollow);

export default router;
