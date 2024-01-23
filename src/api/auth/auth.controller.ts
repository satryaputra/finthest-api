import { Router } from "express";
import { authenticated } from "../../utils/middlewares";
import {
  forgotPasswordFn,
  forgotPasswordRequestFn,
  loginFn,
  refreshTokenFn,
  registerFn,
} from "./auth.services";
import {
  forgotPasswordRequestValidation,
  loginValidation,
  refreshTokenValidation,
  registerValidation,
} from "./auth.validators";

export const authController = Router();

authController.post("/login", loginValidation, loginFn);
authController.post("/register", registerValidation, registerFn);
authController.get("/refresh", refreshTokenValidation, refreshTokenFn);
authController.post("/logout", authenticated, loginFn);
authController.get("/forgot-password/request", forgotPasswordRequestValidation, forgotPasswordRequestFn);
authController.post("/forgot-password", forgotPasswordFn)
