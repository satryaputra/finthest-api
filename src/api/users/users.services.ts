import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../utils/types";
import { Token } from "../../utils/token";
import { db } from "../../utils/db";

/**
 * Get me (current user logged in)
 * @function meFn
 * @param {AuthenticatedRequest} req Custom Express Request object with accessToken property
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express NextFunction middleware
 * @returns {Promise<Response>} Express Response
 */
export const meFn = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { userId } = req.decodeToken as { userId: string };
    const user = await db.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePhoto: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
