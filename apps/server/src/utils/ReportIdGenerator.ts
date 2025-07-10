import pool from "../lib/mysql.js";

export async function generateReportId(
  jenis_lap: "kehilangan" | "penemuan",
  date: Date = new Date()
): Promise<string> {
  // Jenis lap: 10 = penemuan, 20 = kehilangan
  const jenisCode = jenis_lap === "penemuan" ? "10" : "20";
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const dateStr = `${yy}${mm}${dd}`;

  // Get max counter for this date and jenis_lap
  const [rows]: any = await pool.query(
    `SELECT MAX(CAST(SUBSTRING(id, 7, 4) AS UNSIGNED)) as max_counter FROM laporan WHERE id LIKE ?`,
    [`${jenisCode}${dateStr}%`]
  );
  const maxCounter = rows[0]?.max_counter || 0;
  const nextCounter = String(maxCounter + 1).padStart(4, "0");
  return `${jenisCode}${dateStr}${nextCounter}`;
}
