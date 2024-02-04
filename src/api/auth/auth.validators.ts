import { body, query } from "express-validator";
import { validateRequest } from "../../middlewares";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email diperlukan")
    .isEmail()
    .withMessage("Format email salah"),
  body("password")
    .notEmpty()
    .withMessage("Password diperlukan")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password minimal 8 karakter dan maksimal 32 karakter"),
  validateRequest,
];

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama diperlukan")
    .isLength({ min: 3, max: 50 })
    .withMessage("Nama minimal 3 karakter dan maksimal 50 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email diperlukan")
    .isEmail()
    .withMessage("Format email salah"),
  body("password")
    .notEmpty()
    .withMessage("Password diperlukan")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password minimal 8 karakter dan maksimal 32 karakter"),
  validateRequest,
];

export const refreshTokenValidation = [
  query("accessToken")
    .notEmpty()
    .withMessage("Akses token diperlukan")
    .isJWT()
    .withMessage("Format token salah"),
  validateRequest,
];

export const forgotPasswordRequestValidation = [
  query("email")
    .notEmpty()
    .withMessage("Email diperlukan")
    .isEmail()
    .withMessage("Format email salah"),
  validateRequest,
];
