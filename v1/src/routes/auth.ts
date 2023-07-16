import express from "express";
import AuthController from "../controllers/Auth";
import userValidation from "../validations/user.validation";
import validator from "../middlewares/validator.milddleware";
const router = express.Router();

router.route("/").post(validator(userValidation.login), AuthController.login);

export default router;
