import { Express } from "express";
import appConfig from "./env";
import initSwagger from "./swagger";

export default (app: Express) => {
  appConfig();
  initSwagger(app);
};
