import type { Report } from "../types/ReportType";

interface ReportFilter {
  jenis_lap?: "kehilangan" | "penemuan";
}

export interface IReportService {
  getAllReports(filter?: ReportFilter): Promise<Report[]>;
  getReportById(id: string): Promise<Report | null>;
  createReport(report: Omit<Report, "id" | "created_at">): Promise<Report>;
  updateReport(
    id: string,
    updates: Partial<Omit<Report, "id" | "created_at">>
  ): Promise<Report | null>;
  deleteReport(id: string): Promise<void>;
  search(
    query: string,
    jenis_lap?: "kehilangan" | "penemuan"
  ): Promise<Report[]>;
}
