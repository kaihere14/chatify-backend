import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controllers.js";
import verifyOtp from "../middlewares/verifyOtp.middleware.js";
import verifyJWT from "../middlewares/verifyjwt.middlewares.js";

const router = Router();

router.route("/register").post(verifyOtp, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
