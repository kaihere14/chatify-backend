import { ApiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import otp from "../models/otp.model.js";
import { sendOtpEmail } from "../utils/emailService.js"; // Import the new email service

const otpGen = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError("Please enter a valid email", 409);
  }

  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  console.log(randomNumbers);
  try {
    const otpServer = new otp({
      otp: randomNumbers,
      email,
    });

    await otpServer.save({ validateBeforeSave: false });

    // Now send the email only after successfully saving the OTP to the database
    const mailsend = await sendOtpEmail(email, randomNumbers);

    return res
      .status(200)
      .json(new apiResponse(200, otpServer, "otp registered in model"));
  } catch (err) {
    return res
      .status(err.statusCode || 500) // Use the error's status code if available, otherwise 500
      .json(
        new ApiError(
          err.message || "Internal arman Error",
          err.statusCode || 500
        )
      );
  }
};

export { otpGen };
