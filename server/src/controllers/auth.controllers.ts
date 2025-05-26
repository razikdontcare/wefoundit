import { Request, Response } from "express";
import { auth } from "../lib/firebase";
import pool from "../lib/mysql";
import { AuthService } from "../services/auth.services";
import { RegistrationData } from "../interfaces/auth.interface";
import { ApiResponse } from "../types/ApiType";

const authService = new AuthService(auth, pool);

// POST /auth/register
const register = async (req: Request, res: Response): Promise<void> => {
  const registrationData: RegistrationData = req.body;

  if (!registrationData.email || !registrationData.password) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Email and password are required",
      data: null,
    };
    res.status(400).json(response);
    return;
  }

  try {
    const newUser = await authService.registerUser(registrationData);
    const responseData = {
      uid: newUser.uid,
      email: newUser.email,
      name: newUser.name,
    };
    const response: ApiResponse<typeof responseData> = {
      success: true,
      message: "User registered successfully",
      data: responseData,
    };
    res.status(201).json(response);
  } catch (error: any) {
    const statusCode = error.message.includes("already exists") ? 409 : 500;
    const response: ApiResponse<null> = {
      success: false,
      message: error.message.includes("already exists")
        ? error.message
        : "Registration failed",
      data: null,
    };
    res.status(statusCode).json(response);
  }
};

export { register };
