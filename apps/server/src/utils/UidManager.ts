import mysql from "mysql2/promise";

// Database interface for UID collision checking
interface UidRepository {
  existsById(uid: string): Promise<boolean>;
  getMaxCounterForDate(dateString: string): Promise<number>;
}

// MySQL implementation
class MySqlUidRepository implements UidRepository {
  private connection: mysql.Connection;
  private tableName: string;

  constructor(connection: mysql.Connection, tableName: string = "users") {
    this.connection = connection;
    this.tableName = tableName;
  }

  async existsById(uid: string): Promise<boolean> {
    try {
      const [rows] = await this.connection.execute(
        `SELECT 1 FROM ${this.tableName} WHERE id = ? LIMIT 1`,
        [uid]
      );
      return Array.isArray(rows) && rows.length > 0;
    } catch (error) {
      console.error("MySQL error checking UID existence:", error);
      throw error;
    }
  }

  async getMaxCounterForDate(dateString: string): Promise<number> {
    try {
      const [rows] = await this.connection.execute(
        `
        SELECT MAX(CAST(SUBSTRING(id, 8) AS UNSIGNED)) as max_counter 
        FROM ${this.tableName} 
        WHERE id LIKE ? AND LENGTH(id) = 12
      `,
        [`U${dateString}%`]
      );

      const result = rows as any[];
      return result[0]?.max_counter || 0;
    } catch (error) {
      console.error("MySQL error getting max counter:", error);
      return 0;
    }
  }
}

// Global counter management for automatic user ID generation
class UidCounterManager {
  private static instance: UidCounterManager;
  private counters: Map<string, number> = new Map(); // dateString -> counter

  private constructor() {}

  static getInstance(): UidCounterManager {
    if (!UidCounterManager.instance) {
      UidCounterManager.instance = new UidCounterManager();
    }
    return UidCounterManager.instance;
  }

  getNextCounter(dateString: string): number {
    const currentCounter = this.counters.get(dateString) || 0;
    const nextCounter = currentCounter + 1;
    this.counters.set(dateString, nextCounter);
    return nextCounter;
  }

  setCounter(dateString: string, value: number): void {
    this.counters.set(dateString, value);
  }

  getCurrentCounter(dateString: string): number {
    return this.counters.get(dateString) || 0;
  }
}

// Main UID Generator with collision prevention
class UidGenerator {
  private repository?: UidRepository;
  private counterManager: UidCounterManager;

  constructor(repository?: UidRepository) {
    this.repository = repository;
    this.counterManager = UidCounterManager.getInstance();
  }

  /**
   * Initialize counter from database to prevent collision
   */
  async initializeFromDatabase(date?: Date): Promise<void> {
    if (!this.repository) return;

    const currentDate = date || new Date();
    const dateString = this.formatDateString(currentDate);

    try {
      const maxCounter = await this.repository.getMaxCounterForDate(dateString);
      if (maxCounter > this.counterManager.getCurrentCounter(dateString)) {
        this.counterManager.setCounter(dateString, maxCounter);
      }
      console.log(
        `🔄 Initialized counter for ${dateString}: ${this.counterManager.getCurrentCounter(
          dateString
        )}`
      );
    } catch (error) {
      console.warn(
        "Failed to initialize from database, using current counter:",
        error
      );
    }
  }

  /**
   * Generates unique UID with collision prevention
   */
  async generateSafe(date?: Date): Promise<string> {
    const currentDate = date || new Date();
    const dateString = this.formatDateString(currentDate);

    // Initialize from database if not done yet
    if (
      this.repository &&
      this.counterManager.getCurrentCounter(dateString) === 0
    ) {
      await this.initializeFromDatabase(currentDate);
    }

    const maxAttempts = 100; // Prevent infinite loop
    let attempts = 0;

    while (attempts < maxAttempts) {
      const userId = this.counterManager.getNextCounter(dateString);
      const userIdString = String(userId).padStart(5, "0");
      const uid = `U${dateString}${userIdString}`;

      // Check if UID exists in database
      if (this.repository) {
        const exists = await this.repository.existsById(uid);
        if (!exists) {
          return uid;
        }
        console.warn(`⚠️  UID collision detected: ${uid}, trying next...`);
      } else {
        // No repository provided, return directly
        return uid;
      }

      attempts++;
    }

    throw new Error(
      `Failed to generate unique UID after ${maxAttempts} attempts`
    );
  }

  /**
   * Generates UID without collision checking (faster but unsafe)
   */
  generate(date?: Date): string {
    const currentDate = date || new Date();
    const dateString = this.formatDateString(currentDate);

    const userId = this.counterManager.getNextCounter(dateString);
    const userIdString = String(userId).padStart(5, "0");

    return `U${dateString}${userIdString}`;
  }

  /**
   * Format date to MMDDYY string
   */
  private formatDateString(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${month}${day}${year}`;
  }

  /**
   * Get current counter for a specific date
   */
  getCurrentCounter(date?: Date): number {
    const currentDate = date || new Date();
    const dateString = this.formatDateString(currentDate);
    return this.counterManager.getCurrentCounter(dateString);
  }

  /**
   * Reset counter for a specific date
   */
  resetCounter(date?: Date, value: number = 0): void {
    const currentDate = date || new Date();
    const dateString = this.formatDateString(currentDate);
    this.counterManager.setCounter(dateString, value);
  }
}

export { UidGenerator, MySqlUidRepository, UidCounterManager, UidRepository };
