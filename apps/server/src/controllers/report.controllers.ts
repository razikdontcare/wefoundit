import { reportService } from "../services/report.services.js";
import { storageService } from "../services/storage.service.js";
import type { Request, Response } from "express";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const { jenis_lap, created_by } = req.query;
    const reports = await reportService.getAllReports({
      jenis_lap:
        jenis_lap === "kehilangan" || jenis_lap === "penemuan"
          ? jenis_lap
          : undefined,
      created_by: typeof created_by === "string" ? created_by : undefined,
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const report = await reportService.getReportById(id);
    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch report" });
  }
};

export const createReport = async (req: Request, res: Response) => {
  try {
    let foto: string | null = null;
    if (req.file) {
      // Use originalname as key, or generate a unique one
      const key = `${Date.now()}_${req.file.originalname}`;
      foto = await storageService.upload({
        key,
        body: req.file.buffer,
        contentType: req.file.mimetype,
        prefix: "reports",
      });
    }

    // Parse barang from body (handle both JSON and multipart)
    let barang;
    if (req.body.barang && typeof req.body.barang === "string") {
      barang = JSON.parse(req.body.barang);
    } else {
      barang = req.body.barang;
    }

    // Remove barang from body to avoid duplication
    const { barang: _ignore, ...reportFields } = req.body;

    // Add user_id from req.user (set by auth middleware)
    const user_id = (req as any).user?.id;
    if (!user_id) {
      res.status(401).json({ error: "Unauthorized: user_id missing" });
      return;
    }

    const reportData = {
      ...reportFields,
      barang,
      foto,
      user_id,
    };

    const report = await reportService.createReport(
      reportData as any // Accepts the new structure
    );
    res.status(201).json(report);
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(500).json({ error: "Failed to create report" });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await reportService.updateReport(id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update report" });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await reportService.deleteReport(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete report" });
  }
};
