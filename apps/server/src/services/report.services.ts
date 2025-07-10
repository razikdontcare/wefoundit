import type { Report } from "../types/ReportType.js";
import type { IReportService } from "../interfaces/ReportInterface.js";
import pool from "../lib/mysql";
import type { RowDataPacket } from "mysql2";
import { generateReportId } from "../utils/ReportIdGenerator.js";
import { distance } from "fastest-levenshtein";

class ReportService implements IReportService {
  async getAllReports(filter?: {
    jenis_lap?: "kehilangan" | "penemuan";
  }): Promise<Report[]> {
    let query = "SELECT * FROM laporan";
    let params: any[] = [];
    if (filter && filter.jenis_lap) {
      query += " WHERE jenis_lap = ?";
      params.push(filter.jenis_lap);
    }
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows as Report[];
  }

  async getReportById(id: string): Promise<Report | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM laporan WHERE id = ?",
      [id]
    );
    return (rows as Report[])[0] || null;
  }

  async createReport(
    report: Omit<Report, "id" | "created_at">
  ): Promise<Report> {
    // Generate custom report ID
    const id = await generateReportId(report.jenis_lap);
    const created_at = new Date();
    const reportWithId = { ...report, id, created_at };
    await pool.query("INSERT INTO laporan SET ?", reportWithId);
    return reportWithId as Report;
  }

  async updateReport(
    id: string,
    updates: Partial<Omit<Report, "id" | "created_at">>
  ): Promise<Report | null> {
    const [result]: any = await pool.query(
      "UPDATE laporan SET ? WHERE id = ?",
      [updates, id]
    );
    if (result.affectedRows === 0) return null;
    return this.getReportById(id);
  }

  async deleteReport(id: string): Promise<void> {
    await pool.query("DELETE FROM laporan WHERE id = ?", [id]);
  }

  async search(
    query: string,
    jenis_lap?: "kehilangan" | "penemuan"
  ): Promise<Report[]> {
    // Join laporan with barang to get nama_barang and deskripsi
    let sql = `SELECT laporan.*, barang.nama_barang, barang.deskripsi FROM laporan 
       JOIN barang ON laporan.barang_id = barang.id 
       WHERE (barang.nama_barang LIKE ? OR barang.deskripsi LIKE ?)`;
    const params: any[] = [`%${query}%`, `%${query}%`];
    if (jenis_lap) {
      sql += " AND laporan.jenis_lap = ?";
      params.push(jenis_lap);
    }
    const [rows] = await pool.query<RowDataPacket[]>(sql, params);
    // Fuzzy logic: filter and sort by Levenshtein distance
    const threshold = 3; // max distance allowed for fuzzy match
    const reports = (rows as any[]).map((report) => {
      const nameDist = distance(
        query.toLowerCase(),
        (report.nama_barang || "").toLowerCase()
      );
      const descDist = distance(
        query.toLowerCase(),
        (report.deskripsi || "").toLowerCase()
      );
      const minDist = Math.min(nameDist, descDist);
      return { ...report, _fuzzyScore: minDist };
    });
    // Filter by threshold, or return all if nothing matches closely
    let filtered = reports.filter((r) => r._fuzzyScore <= threshold);
    if (filtered.length === 0) filtered = reports;
    // Sort by fuzzy score ascending
    filtered.sort((a, b) => a._fuzzyScore - b._fuzzyScore);
    // Remove _fuzzyScore before returning
    return filtered.map(({ _fuzzyScore, ...rest }) => rest) as Report[];
  }
}

export const reportService = new ReportService();
