import pool from "../lib/mysql.js";

// In-memory counter manager for report IDs
class ReportIdCounterManager {
  private static instance: ReportIdCounterManager;
  private counters: Map<string, number> = new Map(); // key: jenisCode+dateStr -> counter

  private constructor() {}

  static getInstance(): ReportIdCounterManager {
    if (!ReportIdCounterManager.instance) {
      ReportIdCounterManager.instance = new ReportIdCounterManager();
    }
    return ReportIdCounterManager.instance;
  }

  getNextCounter(key: string): number {
    const current = this.counters.get(key) || 0;
    const next = current + 1;
    this.counters.set(key, next);
    return next;
  }

  setCounter(key: string, value: number): void {
    this.counters.set(key, value);
  }

  getCurrentCounter(key: string): number {
    return this.counters.get(key) || 0;
  }
}

/**
 * Initialize the in-memory counter from the database for a given jenis_lap and date
 */
async function initializeReportCounter(
  jenis_lap: "kehilangan" | "penemuan",
  date: Date
) {
  const jenisCode = jenis_lap === "penemuan" ? "10" : "20";
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;
  const key = jenisCode + dateStr;

  const [rows]: any = await pool.query(
    `SELECT MAX(CAST(SUBSTRING(id, 7, 4) AS UNSIGNED)) as max_counter FROM laporan WHERE id LIKE ?`,
    [`${jenisCode}${dateStr}%`]
  );
  const maxCounter = rows[0]?.max_counter || 0;
  const manager = ReportIdCounterManager.getInstance();
  if (maxCounter > manager.getCurrentCounter(key)) {
    manager.setCounter(key, maxCounter);
  }
}

/**
 * Generates a unique report ID with collision prevention (in-memory + DB check)
 */
export async function generateReportId(
  jenis_lap: "kehilangan" | "penemuan",
  date: Date = new Date(),
  maxAttempts = 100
): Promise<string> {
  const jenisCode = jenis_lap === "penemuan" ? "10" : "20";
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;
  const key = jenisCode + dateStr;
  const manager = ReportIdCounterManager.getInstance();

  // Initialize from DB if not done yet
  if (manager.getCurrentCounter(key) === 0) {
    await initializeReportCounter(jenis_lap, date);
  }

  let attempts = 0;
  while (attempts < maxAttempts) {
    const counter = manager.getNextCounter(key);
    const counterStr = String(counter).padStart(4, "0");
    const candidateId = `${jenisCode}${dateStr}${counterStr}`;

    // Double check for existence (in case of race condition)
    const [exists]: any = await pool.query(
      `SELECT 1 FROM laporan WHERE id = ? LIMIT 1`,
      [candidateId]
    );
    if (!exists.length) {
      return candidateId;
    }
    // If exists, try next
    attempts++;
  }
  throw new Error(
    "Failed to generate unique report ID after multiple attempts"
  );
}
