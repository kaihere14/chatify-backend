import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      throw new ApiError("Unauthorized", 401);
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default verifyJWT;
