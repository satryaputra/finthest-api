import { Router } from "express";
import { authenticated } from "../../utils/middlewares";
import { calculationFn } from "./calculation.services";

export const calculationController = Router();
calculationController.post("/addCalculation", authenticated, calculationFn);
