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
      subject: "Your OTP Code for Chatify - Expires in 1 Minute",
      html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0 0 5px 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">CHATIFY</h1>
        <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Secure Login Verification</p>
      </div>

      <!-- Lock Icon -->
      <div style="padding: 30px 30px 20px 30px; text-align: center;">
        <div style="display: inline-block; background-color: #fff3cd; width: 60px; height: 60px; border-radius: 50%; margin: 0 0 20px 0; line-height: 60px; text-align: center;">
          <span style="color: #856404; font-size: 24px; display: inline-block; vertical-align: middle; line-height: 1;">🔐</span>
        </div>
        
        <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 24px; font-weight: 600;">Verification Required</h2>
        <p style="margin: 0 0 25px 0; color: #495057; font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) for secure access to Chatify:</p>
      </div>

      <!-- OTP Code Box -->
      <div style="text-align: center; padding: 0 30px 30px 30px;">
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px dashed #007bff; border-radius: 12px; padding: 25px; margin: 0 0 25px 0; display: inline-block; min-width: 200px;">
          <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
          <p style="margin: 0; font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 4px; font-family: 'Courier New', monospace;">${otp}</p>
        </div>
      </div>

      <!-- Warning Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px;">
        <div style="display: flex; align-items: flex-start;">
          <span style="color: #856404; font-size: 20px; margin-right: 10px; line-height: 1;">⚠️</span>
          <div>
            <p style="margin: 0 0 8px 0; color: #856404; font-size: 16px; font-weight: 600;">Important Security Notice</p>
            <p style="margin: 0 0 5px 0; color: #856404; font-size: 14px; line-height: 1.5;">This OTP is valid for <strong>1 minute only</strong></p>
            <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.5;">Do not share this code with anyone for your security</p>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div style="margin: 0 30px 30px 30px; background-color: #e8f4fd; border-left: 4px solid #007bff; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; font-weight: 600;">How to use this code:</h3>
        <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">Enter this 4-digit code in the verification field on Chatify to complete your login process. The code will expire in 1 minute for your security.</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
        <div style="text-align: center; margin-bottom: 15px;">
          <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">Didn't request this code?</p>
          <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 13px;">If you didn't request this verification code, please ignore this email or contact our support team if you're concerned about your account security.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 15px 0;">
        
        <div style="text-align: center;">
          <p style="margin: 0 0 5px 0; color: #495057; font-size: 16px; font-weight: 600;">Thank you,</p>
          <p style="margin: 0 0 10px 0; color: #495057; font-size: 16px; font-weight: 600;">The Chatify Team</p>
          <p style="margin: 0; color: #6c757d; font-size: 12px;">&copy; 2025 Chatify. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP email.");
  }
};

const sendForgotPasswordOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_TRAP_USER,
      to: email,
      subject: "Password Reset OTP for Chatify - Expires in 5 Minutes",
      html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0 0 5px 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">CHATIFY</h1>
        <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.9;">Password Reset Request</p>
      </div>

      <!-- Lock Icon -->
      <div style="padding: 30px 30px 20px 30px; text-align: center;">
        <div style="display: inline-block; background-color: #f8d7da; width: 60px; height: 60px; border-radius: 50%; margin: 0 0 20px 0; line-height: 60px; text-align: center;">
          <span style="color: #721c24; font-size: 24px; display: inline-block; vertical-align: middle; line-height: 1;">🔑</span>
        </div>
        
        <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 24px; font-weight: 600;">Password Reset Verification</h2>
        <p style="margin: 0 0 25px 0; color: #495057; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Use the OTP below to proceed:</p>
      </div>

      <!-- OTP Code Box -->
      <div style="text-align: center; padding: 0 30px 30px 30px;">
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px dashed #dc3545; border-radius: 12px; padding: 25px; margin: 0 0 25px 0; display: inline-block; min-width: 200px;">
          <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Password Reset OTP</p>
          <p style="margin: 0; font-size: 36px; font-weight: bold; color: #dc3545; letter-spacing: 4px; font-family: 'Courier New', monospace;">${otp}</p>
        </div>
      </div>

      <!-- Warning Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; border-radius: 4px;">
        <div style="display: flex; align-items: flex-start;">
          <span style="color: #721c24; font-size: 20px; margin-right: 10px; line-height: 1;">🚨</span>
          <div>
            <p style="margin: 0 0 8px 0; color: #721c24; font-size: 16px; font-weight: 600;">Security Alert</p>
            <p style="margin: 0 0 5px 0; color: #721c24; font-size: 14px; line-height: 1.5;">This OTP is valid for <strong>5 minutes only</strong></p>
            <p style="margin: 0; color: #721c24; font-size: 14px; line-height: 1.5;">Never share this code with anyone - Chatify will never ask for it</p>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div style="margin: 0 30px 30px 30px; background-color: #e8f4fd; border-left: 4px solid #007bff; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; font-weight: 600;">Next steps:</h3>
        <ol style="margin: 0; padding: 0 0 0 20px; color: #495057; font-size: 14px; line-height: 1.6;">
          <li style="margin-bottom: 5px;">Enter this 4-digit code on the password reset page</li>
          <li style="margin-bottom: 5px;">Create a strong, new password for your account</li>
          <li style="margin-bottom: 0;">Log in with your new password</li>
        </ol>
      </div>

      <!-- Didn't Request Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 10px 0; color: #856404; font-size: 16px; font-weight: 600;">⚠️ Didn't request this?</h3>
        <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px; line-height: 1.5;">If you didn't request a password reset, your account may be at risk. Please:</p>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #856404; font-size: 14px; line-height: 1.5;">
          <li style="margin-bottom: 3px;">Ignore this email (the OTP will expire automatically)</li>
          <li style="margin-bottom: 3px;">Check your account security</li>
          <li style="margin-bottom: 0;">Contact support if needed</li>
        </ul>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; padding: 0 30px 30px 30px;">
        <a href="https://chatify-ai.vercel.app/reset-password" style="display: inline-block; background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; box-shadow: 0 3px 12px rgba(220, 53, 69, 0.3);">Reset My Password</a>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
        <div style="text-align: center; margin-bottom: 15px;">
          <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px;">This is an automated security email from Chatify.</p>
          <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 13px;">If you continue to receive unwanted emails, please contact our support team.</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 15px 0;">
        
        <div style="text-align: center;">
          <p style="margin: 0 0 5px 0; color: #495057; font-size: 16px; font-weight: 600;">Stay secure,</p>
          <p style="margin: 0 0 10px 0; color: #495057; font-size: 16px; font-weight: 600;">The Chatify Security Team</p>
          <p style="margin: 0; color: #6c757d; font-size: 12px;">&copy; 2025 Chatify. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending forgot password OTP to ${email}:`, error);
    throw new Error("Failed to send forgot password OTP email.");
  }
};

const sendRegisterMail = async (email, user) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_TRAP_USER,
      to: email,
      subject: "Welcome to Chatify - Account Created Successfully!",
      html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 0.5px;">CHATIFY</h1>
        <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Welcome to our community!</p>
      </div>

      <!-- Success Icon & Message -->
      <div style="padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; background-color: #e8f5e8; width: 80px; height: 80px; border-radius: 50%; margin: 0 0 20px 0; line-height: 80px; text-align: center;">
          <span style="color: #28a745; font-size: 40px; font-weight: bold; display: inline-block; vertical-align: middle; line-height: 1;">✓</span>
        </div>
        
        <h2 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 28px; font-weight: 600;">Hello ${user}!</h2>
        <p style="margin: 0 0 5px 0; color: #495057; font-size: 18px; font-weight: 500;">Your account has been created</p>
        <p style="margin: 0 0 30px 0; color: #28a745; font-size: 32px; font-weight: bold;">Successfully!</p>
      </div>

      <!-- Info Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">What's next?</h3>
        <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.5;">You can now log in to your account and start exploring all the features Chatify has to offer. Connect with friends, join conversations, and be part of our growing community.</p>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; padding: 0 30px 40px 30px;">
        <a href="https://chatify-ai.vercel.app/" style="display: inline-block; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);">Get Started Now</a>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
        <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 14px; text-align: center;">Thank you for joining us! We're excited to have you on board.</p>
        <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px; text-align: center;">If you did not request this account creation, please ignore this email or contact our support team.</p>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
        
        <div style="text-align: center;">
          <p style="margin: 0 0 5px 0; color: #495057; font-size: 16px; font-weight: 600;">The Chatify Team</p>
          <p style="margin: 0; color: #6c757d; font-size: 12px;">&copy; 2025 Chatify. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP email.");
  }
};

const sendPasswordChangedMail = async (email, user) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_TRAP_USER,
      to: email,
      subject: "Password Changed Successfully - Chatify",
      html: `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 0.5px;">CHATIFY</h1>
        <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Security Notification</p>
      </div>

      <!-- Success Icon & Message -->
      <div style="padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; background-color: #e8f5e8; width: 80px; height: 80px; border-radius: 50%; margin: 0 0 20px 0; line-height: 80px; text-align: center;">
          <span style="color: #28a745; font-size: 35px; display: inline-block; vertical-align: middle; line-height: 1;">🔒</span>
        </div>
        
        <h2 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 28px; font-weight: 600;">Hello ${
          user.username
        }!</h2>
        <p style="margin: 0 0 5px 0; color: #495057; font-size: 18px; font-weight: 500;">Your password has been</p>
        <p style="margin: 0 0 30px 0; color: #28a745; font-size: 32px; font-weight: bold;">Changed Successfully!</p>
        
        <p style="margin: 0; color: #6c757d; font-size: 14px;">Changed on: ${new Date().toLocaleString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          }
        )}</p>
      </div>

      <!-- Security Info Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">Security Tips</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #495057; font-size: 14px; line-height: 1.6;">
          <li style="margin-bottom: 8px;">Use a strong, unique password for your Chatify account</li>
          <li style="margin-bottom: 8px;">Never share your password with anyone</li>
          <li style="margin-bottom: 0;">Consider enabling two-factor authentication for extra security</li>
        </ul>
      </div>

      <!-- Warning Box -->
      <div style="margin: 0 30px 30px 30px; background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; color: #856404; font-size: 16px; font-weight: 600;">⚠️ Didn't make this change?</h3>
        <p style="margin: 0 0 15px 0; color: #856404; font-size: 14px; line-height: 1.5;">If you did not request this password change, your account may be compromised. Please contact our support team immediately.</p>
        <a href="mailto:support@chatify.com" style="color: #856404; font-weight: 600; text-decoration: underline;">Contact Support</a>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; padding: 0 30px 40px 30px;">
        <a href="https://chatify-ai.vercel.app/" style="display: inline-block; background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);">Access Your Account</a>
      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fa; padding: 25px 30px; border-top: 1px solid #e9ecef;">
        <p style="margin: 0 0 15px 0; color: #6c757d; font-size: 14px; text-align: center;">Your account security is our priority. This email was sent to confirm your recent password change.</p>
        <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px; text-align: center;">For security reasons, we recommend changing your password regularly.</p>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
        
        <div style="text-align: center;">
          <p style="margin: 0 0 5px 0; color: #495057; font-size: 16px; font-weight: 600;">The Chatify Security Team</p>
          <p style="margin: 0; color: #6c757d; font-size: 12px;">&copy; 2025 Chatify. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      `Error sending password change confirmation to ${email}:`,
      error
    );
    throw new Error("Failed to send password change confirmation email.");
  }
};

export {
  sendOtpEmail,
  sendRegisterMail,
  sendPasswordChangedMail,
  sendForgotPasswordOtpEmail,
};
