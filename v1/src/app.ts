import express from "express";
import cors from "cors";
import http from "http";
import ErrorHandler from "./middlewares/error.middleware";
import Router from "./routes";
import config from "./config";
import passport from "passport";

function startServer() {
  const app = express();
  config(app);
  app.use(express.static("public"));
  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());

  const port = process.env.PORT || 4000;
  const server = http.createServer(app);

  server.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.use("/api", Router.initializeRoutes());
  app.use(ErrorHandler.handleNotFound);
  app.use(ErrorHandler.handleError);
}

startServer();
