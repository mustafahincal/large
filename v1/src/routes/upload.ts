import { Request, Response, NextFunction } from "express";
import express from "express";
import multer from "multer";
import uploadController from "../controllers/Upload";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, "public/img/uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const file_type = file.mimetype.split("/");
    const type = file_type[file_type.length - 1];
    cb(null, `${uniqueSuffix}.${type}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
});

const router = express.Router();

router
  .route("/image")
  .post(upload.single("image"), uploadController.uploadImage);

export default router;
