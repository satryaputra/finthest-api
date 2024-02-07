import { Router } from "express";
import { authController } from "./auth/auth.controller";
import { usersController } from "./users/users.controller";
import { calculationController } from "./calculation/calculation.controller";

const controller = Router();

controller.use("/auth", authController);
controller.use("/users", usersController);
controller.use("/calculation", calculationController);

export default controller;
