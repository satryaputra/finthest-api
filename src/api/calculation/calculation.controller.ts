import { Router } from "express";
import { calculationFn } from "./calculation.services";
import { authenticated } from "../../middlewares";

export const calculationController = Router();

calculationController.post("/", authenticated, calculationFn);
