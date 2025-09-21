import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { json } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
import {
  sendRegisterMail,
  sendPasswordChangedMail,
  sendForgotPasswordOtpEmail,
} from "../utils/emailService.js";

const accessandRefreshToken = async (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new ApiError("all fields are required", 409);
    }
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError("Email already registered", 409);

    const user = new User({
      username,
      email,
      password,
    });
    await user.save();

    if (!user) {
      throw new ApiError("failed to register", 404);
    }

    await sendRegisterMail(user.email, user.username);
    return res
      .status(200)
      .json(new apiResponse("200", user, "user registered succesfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new ApiError("all fields are required", 400);
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError("user not found", 404);
    }

    const isMatch = await user.passVerify(password);
    if (!isMatch) {
      throw new ApiError("Password is wrong", 401);
    }
    user.refreshToken = "";
    await user.save({ validateBeforeSave: false });
    const { accessToken, refreshToken } = await accessandRefreshToken(user);

    const cookieOptions = {
      httpOnly: true, // prevent JS access (important!)
      secure: process.env.NODE_ENV === "production", // secure only in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(
        new apiResponse(
          200,
          { user: user, accessToken, refreshToken },
          "user logged in"
        )
      );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};

const logoutUser = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError("user not there", 409);
  }

  const user2 = await User.findById(user._id);
  try {
    if (!user2) {
      throw new ApiError("user not found", 404);
    }
    user2.refreshToken = "";
    await user2.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResponse(200, { user: user2 }, "user logged out"));
  } catch (error) {
    return res.status(404).json({
      message: error.message || "Internal Server Error",
      status: error.statusCode || 500,
    });
  }
};

const useRefresh = async (req, res) => {
  const refreshToken = req.headers.authorization?.split(" ")[1];

  try {
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return res
      .status(200)
      .json(
        new apiResponse(200, { accessToken }, "Generated new access token")
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Something went wrong" });
  }
};

const resetPass = async (req, res) => {
  const { email, password } = req;
  try {
    if (!email || !password) {
      throw new ApiError("Please enter all fields", 409);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    if (user.password == password) {
      throw ApiError("New password cannot be same as old", 404);
    }

    user.password = password;
    const fUser = await user.save({ validateBeforeSave: false });
    if (!fUser) {
      throw new ApiError("Failed to change password", 500);
    }
    const mail = await sendPasswordChangedMail(email, user);
    return res
      .status(200)
      .json(new apiResponse(200, "", "Password changed successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
export { registerUser, loginUser, logoutUser, useRefresh, resetPass };
