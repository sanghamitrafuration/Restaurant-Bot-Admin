
import { type Express, Router } from "express";

import { adminRouter } from "@presentation/routes/admin-route";
import { paymentRouter } from "@presentation/routes/payment-route";
import { superAdminRouter } from "@presentation/routes/superAdmin-route";

export default (app: Express): void => {
  const router = Router();

  app.get("/restaurant", (req, res) => {
    res.status(200).json({ message: "Welcome to Akina",});
  });

  app.use(router);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/superadmin",superAdminRouter);

};