import { Router } from "express";
import { authController } from "./auth/auth.controller";
import { usersController } from "./users/users.controller";

const controller = Router();

controller.use("/auth", authController);
controller.use("/users", usersController);

export default controller;
