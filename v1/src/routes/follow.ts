import express from "express";
const router = express.Router();
import followController from "../controllers/Follows";

router.route("/").get(followController.index);
router.route("/:userId").post(followController.follow);

export default router;
