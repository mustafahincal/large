import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import paths from "../utils/docs/index.json";
import type { Express } from "express";

export default (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "B-LOG Application",
        version: "0.1.0",
        description: "This is a blog app.",
        license: {
          name: "MIT",
          url: "",
        },
        contact: {
          // name: "Mustafa Hıncal",
          // url: "https://github.com/mustafahincal",
          //email: "mustafahncal@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000/api",
        },
      ],
      paths: {
        ...paths,
      },
    },
    apis: ["../routes.js"],
  };

  const specs: object = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
