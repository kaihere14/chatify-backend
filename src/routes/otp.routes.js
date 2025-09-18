import { Router } from "express";
import { otpGen } from "../controllers/otp.controlller.js";

const router = Router();

router.route("/otp").post(otpGen);

export default router;
