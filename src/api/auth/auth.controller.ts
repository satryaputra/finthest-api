import { Router } from "express";
import { authenticated, validateRequest } from "../../middlewares";
import {
  forgotPasswordFn,
  resetPasswordFn,
  loginFn,
  logoutFn,
  refreshTokenFn,
  signupFn,
} from "./auth.services";
import {
  forgotPasswordValidation,
  loginValidation,
  refreshTokenValidation,
  registerValidation,
  resetPasswordValidation,
} from "./auth.validators";

export const authController = Router();

authController.post("/login", loginValidation, validateRequest, loginFn);

authController.post("/signup", registerValidation, validateRequest, signupFn);

authController.post(
  "/refresh",
  refreshTokenValidation,
  validateRequest,
  refreshTokenFn
);  

authController.post("/logout", authenticated, logoutFn);

authController.post(
  "/password/forgot",
  forgotPasswordValidation,
  validateRequest,
  forgotPasswordFn
);

authController.post(
  "/password/reset",
  resetPasswordValidation,
  validateRequest,
  resetPasswordFn
);
