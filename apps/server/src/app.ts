import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { ApiResponse } from "./types/ApiType";
import { authRoutes } from "./routes/auth.routes";

config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (_req: Request, res: Response<ApiResponse<null>>) => {
  res.status(200).json({
    success: true,
    message: "WeFoundIt API",
    data: null,
  });
});

// auth routes
app.use("/api/auth", authRoutes);

// handle 404
app.use((_req: Request, res: Response<ApiResponse<null>>, _: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    data: null,
  });
});

// handle errors
app.use(
  (
    err: Error,
    req: Request,
    res: Response<ApiResponse<null>>,
    _: NextFunction
  ) => {
    console.error(err.stack);
    console.error(`404 Not Found: ${req.originalUrl}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: null,
    });
  }
);

export { app };
