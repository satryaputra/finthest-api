import { body, query } from "express-validator";

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
];

export const refreshTokenValidation = [
  query("accessToken")
    .notEmpty()
    .withMessage("Akses token diperlukan")
    .isJWT()
    .withMessage("Format token salah"),
];

export const forgotPasswordValidation = [
  query("email")
    .notEmpty()
    .withMessage("Email diperlukan")
    .isEmail()
    .withMessage("Format email salah"),
];

export const resetPasswordValidation = [
  body("token")
    .notEmpty()
    .withMessage("Token diperlukan")
    .isJWT()
    .withMessage("Token tidak valid"),
  body("newPassword")
    .notEmpty()
    .withMessage("Password diperlukan")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password minimal 8 karakter dan maksimal 32 karakter"),
];
