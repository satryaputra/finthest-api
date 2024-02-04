import { Router } from "express";
import { authenticated } from "../../middlewares";
import { meFn } from "./users.services";

export const usersController = Router();

usersController.get("/me", authenticated, meFn);
