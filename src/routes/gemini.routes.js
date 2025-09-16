import { Router } from "express";
import main from "../controllers/ai.js";
import verifyJWT from "../middlewares/verifyjwt.middlewares.js";

const router = Router();

router.route("/asked").post(verifyJWT, main);

export default router;
