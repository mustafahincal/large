import { Request, Response, NextFunction } from "express";
import path from "path";

interface MulterRequest extends Request {
  file: any;
}

class UploadController {
  uploadImage = async (
    req: Request | MulterRequest,
    res: Response,
    next: NextFunction
  ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const baseUrl = process.env.BASE_URL || "http://localhost:4000";
    const filePath = req.file.path.replace("public" + path.sep, "");
    const url = `${baseUrl}/${filePath.split(path.sep).join("/")}`;
    return res.send({
      url: url,
    });
  };
}

export default new UploadController();
