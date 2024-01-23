import jwt from "jsonwebtoken";
import type { Request } from "express";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  decodeToken: string | jwt.JwtPayload;
}
