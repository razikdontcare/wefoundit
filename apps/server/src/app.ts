import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { ApiResponse } from "./types/ApiType.js";
import { authRoutes } from "./routes/auth.routes.js";
import { reportRoutes } from "./routes/reports.routes.js";
import { reportService } from "./services/report.services.js";
import { fileRoutes } from "./routes/file.routes.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./src/swagger.yaml");

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

// Swagger documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// auth routes

// search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q as string;
    const jenis_lap = req.query.jenis_lap as
      | "kehilangan"
      | "penemuan"
      | undefined;
    if (!query) {
      res.status(400).json({
        success: false,
        message: "Missing search query parameter 'q'",
        data: null,
      });
    }
    const results = await reportService.search(query, jenis_lap);
    res.status(200).json({
      success: true,
      message: "Search results",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to perform search",
      data: null,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/file", fileRoutes);

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
