import { ApiError } from "../utils/apiError.js";
import otpModel from "../models/otp.model.js";

const verifyOtp = async (req, res, next) => {
  try {
    const { email, username, password, otp } = req.body; // Assuming email and otp are in the request body

    if (!email || !otp) {
      throw new ApiError("Email and OTP are required for verification", 400);
    }

    const otpGot = await otpModel.findOne({ email, otp });

    if (!otpGot) {
      throw new ApiError("Invalid or expired OTP", 400);
    }

    // If OTP is found and valid, you might want to delete it to prevent reuse
    await otpModel.deleteOne({ email, otp });

    // Attach the verified details to the request for subsequent middleware/controllers
    req.email = email;
    req.username = username;
    req.password = password; // Be cautious about passing raw password this way
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.message || "Internal Server Error",
          error.statusCode || 500
        )
      );
  }
};

export default verifyOtp;
