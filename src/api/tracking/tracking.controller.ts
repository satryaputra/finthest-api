import { Router } from "express";
import { authenticated } from "../../middlewares";
import { addTrackingOutput, getTrackingOutput } from "./tracking.services";

export const trackingController = Router();

trackingController.post("/", authenticated, addTrackingOutput);
trackingController.get('/', authenticated, getTrackingOutput);