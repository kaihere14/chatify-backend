import express from "express";
import verifyJWT from "../middlewares/verifyjwt.middlewares.js"; // your middleware

const router = express.Router();

// Check if refresh token cookie is valid and return user
router.get("/me", verifyJWT, async (req, res) => {
  try {
    // verifyJwt already attached `req.user` from the token
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
