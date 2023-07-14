import express from "express";
import usersController from "../controllers/UserController";
const router = express.Router();

router.route("/").get(usersController.index).post(usersController.add);

export default router;
