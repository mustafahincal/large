import express from "express";
import AuthController from "../controllers/Auth";
import userValidation from "../validations/user.validation";
import validator from "../middlewares/validator.milddleware";
import passport from "passport";
import authController from "../controllers/Auth";
import { errorCatcher } from "../utils/errorCatcher";
const router = express.Router();

router
  .route("/")
  .post(validator(userValidation.login), errorCatcher(AuthController.login));

router.route("/github").get(passport.authenticate("github"));

router
  .route("/github/callback")
  .get(
    passport.authenticate("github", { session: false }),
    authController.handleSuccessfullAuth
  );

export default router;
