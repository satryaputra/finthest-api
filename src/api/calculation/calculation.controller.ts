import { Router } from "express";
import { calculationFn, getCalculationFn } from "./calculation.services";
import { authenticated } from "../../middlewares";

export const calculationController = Router();

calculationController.post("/", authenticated, calculationFn);
calculationController.get("/", authenticated, getCalculationFn);