import { authService } from "../services/auth.services";
import { Request, Response } from "express";
import { AuthError } from "../interfaces/AuthError";
import { sendResponse, sendErrorResponse } from "../utils/responseHelper";

export const authController = {
  async loginWithEmail(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginWithEmail(email, password);
      res.cookie("sessionToken", result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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
        photo_url,
      });

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
        sameSite: "strict",
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
};
