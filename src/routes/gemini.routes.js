import { Router } from "express";
import main from "../controllers/ai.js";
import verifyJWT from "../middlewares/verifyjwt.middlewares.js";
import { inputRedfine } from "../controllers/ai.js";

const router = Router();

router.route("/asked").post(verifyJWT, main);
router.route("/redefine").post(verifyJWT, inputRedfine);
export default router;
