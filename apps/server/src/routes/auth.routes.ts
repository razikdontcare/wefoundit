import express from "express";
import { authController } from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";
const router = express.Router();
// Public routes
router.post("/login", authController.loginWithEmail);
router.post("/google", authController.loginWithGoogle);
router.post("/register", authController.registerWithEmail);
// Protected routes
router.get("/me", authMiddleware, authController.getCurrentUser);
router.get("/user/:id", authMiddleware, authController.getUserById);
router.post("/logout", authMiddleware, authController.logout);

export { router as authRoutes };
