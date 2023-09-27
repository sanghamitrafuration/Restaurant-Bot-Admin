import express, { type Express } from "express";
import setupRoutes from "@main/config/routes";


export default (): Express => {
  const app = express();
  let cors = require('cors')
  app.use(cors({origin: "*"}))
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  setupRoutes(app);
  return app;
};
