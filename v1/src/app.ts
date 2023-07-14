import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/error";
import Router from "./routes";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

function startServer() {
  const app = express();
  app.use(express.static("public"));
  app.use(cors());
  app.use(express.json());

  const port = process.env.PORT || 4000;
  const server = http.createServer(app);

  server.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
  });
  /* 
  app.use("/api/test", (req, res) => {
    res.send("Hello World");
  });
 */
  app.use("/api", Router.initializeRoutes());
  app.use(ErrorHandler.handleNotFound);
  app.use(ErrorHandler.handleError);
}

startServer();
