import express from "express";
const router = express.Router();
import followController from "../controllers/Follows";
import authentication from "../middlewares/auth.middleware";

router.route("/").get(followController.index);
router.route("/followings/:id").get(followController.getFollowings);
router.route("/followers/:id").get(followController.getFollowers);
router
  .route("/:id")
  .post(authentication.authenticate, followController.follow)
  .delete(authentication.authenticate, followController.unfollow);

export default router;
