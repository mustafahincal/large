import { Express } from "express";
import appConfig from "./env";
import initSwagger from "./swagger";
import authGithub from "./OAuth-github";

export default (app: Express) => {
  appConfig();
  authGithub();
  initSwagger(app);
};
