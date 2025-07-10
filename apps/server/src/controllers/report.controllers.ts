import { reportService } from "../services/report.services.js";
import { storageService } from "../services/storage.service.js";
import type { Request, Response } from "express";
import type { Report } from "../types/ReportType.js";

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const { jenis_lap } = req.query;
    const reports = await reportService.getAllReports(
      jenis_lap
        ? { jenis_lap: jenis_lap as "kehilangan" | "penemuan" }
        : undefined
    );
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
    const reportData = {
      ...req.body,
      foto,
    };
    const report = await reportService.createReport(
      reportData as Omit<Report, "id" | "created_at">
    );
    res.status(201).json(report);
  } catch (err) {
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
