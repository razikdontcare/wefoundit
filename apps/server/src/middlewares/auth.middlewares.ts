import { RequestHandler, Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/ApiType";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthService } from "../services/auth.services";
import { auth } from "../lib/firebase";
import pool from "../lib/mysql";

const authService = new AuthService(auth, pool);

const authenticateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    const response: ApiResponse<null> = {
      success: false,
      message: "No token provided",
      data: null,
    };
    res.status(401).json(response);
    return;
  }

  try {
    const decodedToken: DecodedIdToken = await authService.verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      message: "Invalid token",
      data: null,
    };

    res.status(401).json(response);
    return;
  }
};

export { authenticateToken };
