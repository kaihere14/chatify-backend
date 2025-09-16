import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default verifyJWT;
