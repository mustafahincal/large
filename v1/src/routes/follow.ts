import express from "express";
const router = express.Router();
import followController from "../controllers/Follows";
import authentication from "../middlewares/auth.middleware";
import { errorCatcher } from "../utils/errorCatcher";

router.route("/").get(errorCatcher(followController.index));
router
  .route("/followings/:id")
  .get(errorCatcher(followController.getFollowings));
router.route("/followers/:id").get(errorCatcher(followController.getFollowers));
router
  .route("/:id")
  .post(authentication.authenticate, errorCatcher(followController.follow))
  .delete(authentication.authenticate, errorCatcher(followController.unfollow));

export default router;
