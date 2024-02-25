import type { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, User } from "../../utils/types";
import { _db } from "../../utils/_db";

export const getWishlist = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> => {
  const { userId } = req.decodeToken as { userId: string };
  const user = await _db.users.findUnique({
    where: {
      id: userId,
    },
  });

  const data = await _db.wishList.findMany({
    where: {
      idUser: user.id,
    },
  });
  return res.status(201).json({
    message: `Berhasil ambil data Wishlist user ${user.name}`,
    data: data,
  });
};
