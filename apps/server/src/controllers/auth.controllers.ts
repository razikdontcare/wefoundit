import { authService } from "../services/auth.services.js";
import { mailService } from "../services/mail.services.js";
import { Request, Response } from "express";
import { AuthError } from "../interfaces/AuthError.js";
import { sendResponse, sendErrorResponse } from "../utils/responseHelper.js";

export const authController = {
  async loginWithEmail(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginWithEmail(email, password);
      res.cookie("sessionToken", result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      sendResponse(res, "Login successful", result);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async registerWithEmail(req: Request, res: Response) {
    try {
      const { email, password, name, photo_url } = req.body;
      const user = await authService.registerWithEmail({
        email,
        password,
        name,
        photo_url: photo_url || "",
        verified: false,
      });

      await mailService.sendWelcomeEmail(email);
      const verificationCode = await authService.generateVerificationCode(
        email
      );
      await mailService.sendVerificationEmail(email, verificationCode, name);

      sendResponse(res, "User registered successfully", user, 201);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async loginWithGoogle(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const result = await authService.loginWithGoogle(token);
      res.cookie("sessionToken", result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      sendResponse(res, "Google login successful", result);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await authService.getUserById(userId);
      if (!user) {
        sendErrorResponse(res, "User not found", 404);
        return;
      }

      sendResponse(res, "User retrieved successfully", user);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async logout(_: Request, res: Response) {
    try {
      res.clearCookie("sessionToken");
      sendResponse(res, "Logged out successfully", null);
      return;
    } catch (error) {
      sendErrorResponse(res, "Internal Server Error", 500);
      return;
    }
  },

  async getCurrentUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        sendErrorResponse(res, "Unauthorized", 401);
        return;
      }

      const user = await authService.getUserById(req.user.id);
      if (!user) {
        sendErrorResponse(res, "User not found", 404);
        return;
      }

      sendResponse(res, "Current user retrieved successfully", user);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();
      sendResponse(res, "All users retrieved successfully", users);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async sendVerificationEmail(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        sendErrorResponse(res, "User ID is required", 400);
        return;
      }
      const user = await authService.getUserById(id);
      const verificationCode = await authService.generateVerificationCode(
        user?.email || ""
      );
      const success = await mailService.sendVerificationEmail(
        user?.email || "",
        verificationCode,
        user?.name || "User"
      );

      if (success) {
        sendResponse(res, "Verification email sent successfully", null);
      } else {
        sendErrorResponse(res, "Failed to send verification email", 500);
      }
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email, verificationCode } = req.body;
      if (!email || !verificationCode) {
        sendErrorResponse(res, "Email and verification code are required", 400);
        return;
      }

      const { user, sessionToken } = await authService.verifyEmail(
        email,
        verificationCode
      );

      res.cookie("sessionToken", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      sendResponse(res, "Email verified successfully", user);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        sendErrorResponse(res, "Email and new password are required", 400);
        return;
      }

      const { user, sessionToken } = await authService.resetPassword(
        email,
        newPassword
      );

      res.cookie("sessionToken", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 60 * 1000, // 30 minutes
      });

      sendResponse(res, "Password reset successfully", user);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const updates = req.body;

      if (!userId || !updates) {
        sendErrorResponse(res, "User ID and updates are required", 400);
        return;
      }

      const updatedUser = await authService.updateUser(userId, updates);
      sendResponse(res, "User updated successfully", updatedUser);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      if (!userId) {
        sendErrorResponse(res, "User ID is required", 400);
        return;
      }

      await authService.deleteUser(userId);
      sendResponse(res, "User deleted successfully", null);
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },

  async sendWelcomeEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        sendErrorResponse(res, "Email is required", 400);
        return;
      }

      const success = await mailService.sendWelcomeEmail(email);
      if (success) {
        sendResponse(res, "Welcome email sent successfully", null);
      } else {
        sendErrorResponse(res, "Failed to send welcome email", 500);
      }
      return;
    } catch (error) {
      sendErrorResponse(res, (error as AuthError).message);
      return;
    }
  },
};
