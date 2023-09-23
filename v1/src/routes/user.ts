import express from "express";
import usersController from "../controllers/Users";
import userValidation from "../validations/user.validation";
import validator from "../middlewares/validator.milddleware";
import { errorCatcher } from "../utils/errorCatcher";

const router = express.Router();

router
  .route("/")
  .get(errorCatcher(usersController.index))
  .post(validator(userValidation.create), errorCatcher(usersController.add));

router
  .route("/:id")
  .get(errorCatcher(usersController.getById))
  .patch(errorCatcher(usersController.patch))
  .delete(errorCatcher(usersController.remove));

router.get("/details/:id", errorCatcher(usersController.getUserDetails));

export default router;
