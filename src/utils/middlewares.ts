import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./types";
import { validationResult } from "express-validator";
import { ClientError, UnauthorizedError } from "./exceptions";
import { Token } from "./token";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validasi Error",
      errors: errors.array().map((error) => error.msg),
    });
  }
  next();
};

export const authenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    const [bearer, accesstoken] = authorizationHeader.split(" ");

    if (bearer !== "Bearer" || !accesstoken) {
      throw new UnauthorizedError("Perlu Otorisasi");
    }

    try {
      req.decodeToken = Token.claim(accesstoken);
      next();
    } catch (error) {
      throw new UnauthorizedError("Akses token tidak valid");
    }
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") console.log(err.stack);

  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};
