import { Router } from "express";
import multer from "multer";
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/report.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { reportService } from "../services/report.services.js";

// Middleware to check if user is owner or admin
import type { Request, Response, NextFunction } from "express";

const reportOwnerOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const report = await reportService.getReportById(id);
    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    // req.user is set by authMiddleware
    if (
      req.user &&
      (req.user.role === "admin" || req.user.id === report.user_id)
    ) {
      next();
      return;
    }
    res.status(403).json({ error: "Forbidden: Not allowed" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.post("/", authMiddleware, upload.single("photo"), createReport);
router.put("/:id", authMiddleware, reportOwnerOrAdminMiddleware, updateReport);
router.delete(
  "/:id",
  authMiddleware,
  reportOwnerOrAdminMiddleware,
  deleteReport
);

export { router as reportRoutes };
