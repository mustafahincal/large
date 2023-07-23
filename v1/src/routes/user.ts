import express from "express";
import usersController from "../controllers/User";
import userValidation from "../validations/user.validation";
import validator from "../middlewares/validator.milddleware";
const router = express.Router();

router
  .route("/")
  .get(usersController.index)
  .post(validator(userValidation.create), usersController.add);

router
  .route("/:id")
  .get(usersController.getById)
  .delete(usersController.remove);

export default router;
