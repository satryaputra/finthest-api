import { Router } from "express";
import { getWishlist } from "./wishlist.services";
import { authenticated } from "../../middlewares";

export const wishlistController = Router();

wishlistController.get("/", authenticated, getWishlist);