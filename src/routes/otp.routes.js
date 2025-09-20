import { Router } from "express";
import { otpGen, forgotOtp } from "../controllers/otp.controlller.js";

const router = Router();

router.route("/otp").post(otpGen);
router.route("/forgot/otp").post(forgotOtp);

export default router;
