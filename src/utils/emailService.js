import nodemailer from "nodemailer";
import "dotenv/config"; // Ensure dotenv is configured for env variables

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.MAIL_TRAP_USER, // Your email address from .env
    pass: process.env.MAIL_TRAP_PASS, // Your email password or app-specific password from .env
  },
});

const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_TRAP_USER,
      to: email,
      subject: "Your OTP for Chatify",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello!</h2>
          <p>Your One-Time Password (OTP) for Chatify is:</p>
          <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otp}</p>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,</p>
          <p>The Chatify Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP email.");
  }
};

export { sendOtpEmail };
