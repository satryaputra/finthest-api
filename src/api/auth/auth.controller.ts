import { Router } from "express";
import { authenticated } from "../../middlewares";
import {
  forgotPasswordFn,
  forgotPasswordRequestFn,
  loginFn,
  logoutFn,
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
authController.post("/signup", registerValidation, registerFn);
authController.post("/refresh", refreshTokenValidation, refreshTokenFn);
authController.post("/logout", authenticated, logoutFn);
authController.post("/password/forgot", forgotPasswordRequestValidation, forgotPasswordRequestFn);
authController.post("/password/reset", forgotPasswordFn);
