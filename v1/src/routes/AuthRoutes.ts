import express from "express";
import AuthController from "../controllers/AuthController";
const router = express.Router();

router.route("/").post(AuthController.login);

export default router;
