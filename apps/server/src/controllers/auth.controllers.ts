import { authService } from "../services/auth.services";
import { Request, Response } from "express";
import { AuthError } from "../interfaces/AuthError";
import { ApiResponse } from "../types/ApiType";

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

      const response: ApiResponse<typeof result> = {
        success: true,
        message: "Login successful",
        data: result,
      };
      res.status(200).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: (error as AuthError).message,
        data: null,
      };
      res.status(400).json(response);
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

      const response: ApiResponse<typeof user> = {
        success: true,
        message: "User registered successfully",
        data: user,
      };
      res.status(201).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: (error as AuthError).message,
        data: null,
      };
      res.status(400).json(response);
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

      const response: ApiResponse<typeof result> = {
        success: true,
        message: "Google login successful",
        data: result,
      };
      res.status(200).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: (error as AuthError).message,
        data: null,
      };
      res.status(400).json(response);
      return;
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await authService.getUserById(userId);
      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "User not found",
          data: null,
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<typeof user> = {
        success: true,
        message: "User retrieved successfully",
        data: user,
      };
      res.status(200).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: (error as AuthError).message,
        data: null,
      };
      res.status(400).json(response);
      return;
    }
  },

  async logout(_: Request, res: Response) {
    try {
      res.clearCookie("sessionToken");
      const response: ApiResponse<null> = {
        success: true,
        message: "Logged out successfully",
        data: null,
      };
      res.status(200).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Internal Server Error",
        data: null,
      };
      res.status(500).json(response);
      return;
    }
  },

  async getCurrentUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "Unauthorized",
          data: null,
        };
        res.status(401).json(response);
        return;
      }

      const user = await authService.getUserById(req.user.id);
      if (!user) {
        const response: ApiResponse<null> = {
          success: false,
          message: "User not found",
          data: null,
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<typeof user> = {
        success: true,
        message: "Current user retrieved successfully",
        data: user,
      };
      res.status(200).json(response);
      return;
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: (error as AuthError).message,
        data: null,
      };
      res.status(400).json(response);
      return;
    }
  },
};
