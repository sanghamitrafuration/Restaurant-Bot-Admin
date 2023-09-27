
import { type Express, Router } from "express";

import { adminRouter } from "@presentation/routes/admin-route";
import { paymentRouter } from "@presentation/routes/payment-route";
import { userRouter } from "@presentation/routes/user-route";
import validator from "@presentation/middleware/validator.middleware";

export default (app: Express): void => {
  const router = Router();

  app.get("/restaurant", (req, res) => {
    res.status(200).json({ message: "Welcome to Business bot",});
  });

  app.use(router);
  app.use("/api/v1/user",userRouter);
  // app.use(validator);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/payment", paymentRouter);

};