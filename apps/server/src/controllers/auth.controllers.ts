import { authService } from "../services/auth.services";
import { Request, Response } from "express";
import { AuthError } from "../interfaces/AuthInterface";

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
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(400).json({ error: (error as AuthError).message });
      return;
    }
  },

  async registerWithEmail(req: Request, res: Response) {
    try {
      const { email, password, name, photoURL } = req.body;
      const user = await authService.registerWithEmail({
        email,
        password,
        name,
        photoURL,
      });

      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(400).json({ error: (error as AuthError).message });
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
      res.status(200).json(result);
      return;
    } catch (error) {
      res.status(400).json({ error: (error as AuthError).message });
      return;
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await authService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(400).json({ error: (error as AuthError).message });
      return;
    }
  },

  async logout(_: Request, res: Response) {
    try {
      res.clearCookie("sessionToken");
      res.status(200).json({ message: "Logged out successfully" });
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  },
  async getCurrentUser(req: Request, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      // Assuming req.user is populated by authMiddleware
      const user = await authService.getUserById(req.user.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
      return;
    } catch (error) {
      res.status(400).json({ error: (error as AuthError).message });
      return;
    }
  },
};
