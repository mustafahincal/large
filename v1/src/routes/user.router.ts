import express from "express";
import usersController from "../controllers/user.controller";
const router = express.Router();

router.route("/").get(usersController.index).post(usersController.add);

export default router;
