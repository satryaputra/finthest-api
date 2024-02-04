import { Router } from "express";
import { authenticated } from "../../middlewares";
import { meFn } from "./users.services";

export const usersController = Router();

usersController.get("/me", authenticated, meFn);
usersController.get("/test", authenticated, (req, res) => {
  res.status(200).json({ message: "Sukses" });
});
