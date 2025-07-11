import express from "express";
import { authController } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = express.Router();
// Public routes
router.post("/login", authController.loginWithEmail);
router.post("/google", authController.loginWithGoogle);
router.post("/register", authController.registerWithEmail);
router.post("/send-verification", authController.sendVerificationEmail);
router.post("/reset-password", authController.resetPassword);
router.post("/verify", authController.verifyEmail);
// Protected routes
router.get("/me", authMiddleware, authController.getCurrentUser);
router.get("/users/:id", authController.getUserById);
router.get("/users", authMiddleware, authController.getAllUsers);
router.post("/logout", authMiddleware, authController.logout);
router.put("/users/:id", authMiddleware, authController.updateUser);
router.delete("/users/:id", authMiddleware, authController.deleteUser);

export { router as authRoutes };
