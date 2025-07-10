import type { Report } from "../types/ReportType.js";
import type { IReportService } from "../interfaces/ReportInterface.js";
import pool from "../lib/mysql.js";
import type { RowDataPacket } from "mysql2";
import { generateReportId } from "../utils/ReportIdGenerator.js";
import { distance } from "fastest-levenshtein";

class ReportService implements IReportService {
  async getAllReports(filter?: {
    jenis_lap?: "kehilangan" | "penemuan";
    created_by?: string; // Optional filter for user ID
  }): Promise<any[]> {
    // Join laporan with barang to get barang details
    let query = `SELECT laporan.*, 
      barang.id as barang_id, barang.nama_barang, barang.jenis_barang, barang.deskripsi, barang.jumlah
      FROM laporan 
      JOIN barang ON laporan.barang_id = barang.id`;
    let params: any[] = [];
    if (filter && filter.jenis_lap) {
      query += " WHERE laporan.jenis_lap = ?";
      params.push(filter.jenis_lap);
    }
    if (filter && filter.created_by) {
      query += params.length ? " AND" : " WHERE";
      query += " laporan.user_id = ?";
      params.push(filter.created_by);
    }
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    // Map barang fields into a nested object
    return (rows as any[]).map((row) => {
      const {
        barang_id,
        nama_barang,
        jenis_barang,
        deskripsi,
        jumlah,
        ...report
      } = row;
      return {
        ...report,
        barang_id,
        barang: {
          id: barang_id,
          nama_barang,
          jenis_barang,
          deskripsi,
          jumlah,
        },
      };
    });
  }

  async getReportById(id: string): Promise<any | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT laporan.*, 
        barang.id as barang_id, barang.nama_barang, barang.jenis_barang, barang.deskripsi, barang.jumlah
        FROM laporan 
        JOIN barang ON laporan.barang_id = barang.id
        WHERE laporan.id = ?`,
      [id]
    );
    const row = (rows as any[])[0];
    if (!row) return null;
    const {
      barang_id,
      nama_barang,
      jenis_barang,
      deskripsi,
      jumlah,
      ...report
    } = row;
    return {
      ...report,
      barang_id,
      barang: {
        id: barang_id,
        nama_barang,
        jenis_barang,
        deskripsi,
        jumlah,
      },
    };
  }

  async createReport(
    report: Omit<Report, "id" | "created_at"> & {
      barang: {
        nama_barang: string;
        jenis_barang: string;
        deskripsi: string;
        jumlah: number;
      };
    }
  ): Promise<Report> {
    // 1. Insert barang first
    const [barangResult]: any = await pool.query(
      "INSERT INTO barang SET ?",
      report.barang
    );
    const barang_id = barangResult.insertId;

    // 2. Generate custom report ID
    const id = await generateReportId(report.jenis_lap);
    const created_at = new Date();

    // 3. Prepare laporan data
    const reportWithId = {
      ...report,
      barang_id,
      id,
      created_at,
    };
    // Remove the 'barang' property before insert
    delete (reportWithId as any).barang;

    // 4. Insert laporan
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
    // Join laporan with barang to get all barang fields
    let sql = `SELECT laporan.*, 
      barang.id as barang_id, barang.nama_barang, barang.jenis_barang, barang.deskripsi, barang.jumlah
      FROM laporan 
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
    const reports = (rows as any[]).map((row) => {
      const nameDist = distance(
        query.toLowerCase(),
        (row.nama_barang || "").toLowerCase()
      );
      const descDist = distance(
        query.toLowerCase(),
        (row.deskripsi || "").toLowerCase()
      );
      const minDist = Math.min(nameDist, descDist);
      // Structure result like getAllReports
      const {
        barang_id,
        nama_barang,
        jenis_barang,
        deskripsi,
        jumlah,
        ...report
      } = row;
      return {
        ...report,
        barang_id,
        barang: {
          id: barang_id,
          nama_barang,
          jenis_barang,
          deskripsi,
          jumlah,
        },
        _fuzzyScore: minDist,
      };
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
