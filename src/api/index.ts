import { Router } from "express";
import { authController } from "./auth/auth.controller";
import { usersController } from "./users/users.controller";
import { calculationController } from "./calculation/calculation.controller";
import { trackingController } from "./tracking/tracking.controller";

const controller = Router();

controller.use("/auth", authController);
controller.use("/users", usersController);
controller.use("/calculation", calculationController);
controller.use("/trackings", trackingController);

export default controller;
