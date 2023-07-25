import { Request, Response, NextFunction } from "express";

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
    try {
      const url = `${process.env.BASE_URL}/${req.file.path.replace(
        "public/",
        ""
      )}`;
      return res.send({
        url: url,
      });
    } catch (err) {
      return next(err);
    }
  };
}

export default new UploadController();
