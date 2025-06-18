import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config";
import { User } from "../types/UserType";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.sessionToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded as User; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token",
      message: (error as Error).message,
    });
    return;
  }
};
