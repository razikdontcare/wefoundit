import { IAuthService } from "../interfaces/AuthInterface";
import { auth } from "../lib/firebase";
import pool from "../lib/mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { RegisterUser, User } from "../types/UserType";
import { AuthError } from "../interfaces/AuthError";
import { env } from "../config";
import { MySqlUidRepository, UidGenerator } from "../utils/UidManager";

class AuthService implements IAuthService {
  private sanitizeUser(user: User): Omit<User, "password_hash"> {
    const { password_hash, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  async loginWithEmail(email: string, password: string) {
    if (!email || !password) {
      throw new AuthError(
        "INVALID_CREDENTIALS",
        "Email and password are required"
      );
    }

    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    const users = rows as User[];

    if (users.length === 0) {
      throw new AuthError("USER_NOT_FOUND", "User not found");
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash || ""
    );

    if (!isPasswordValid) {
      throw new AuthError("INVALID_PASSWORD", "Invalid password");
    }

    // Update last_login timestamp
    await pool.execute(`UPDATE users SET last_login = NOW() WHERE id = ?`, [
      user.id,
    ]);

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photo_url,
      role: user.role,
      active: user.active,
      providers: user.providers || [],
    };

    const sessionToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const firebaseToken = await auth.createCustomToken(user.id);

    return { sessionToken, firebaseToken, user: this.sanitizeUser(user) };
  }
  async loginWithGoogle(token: string) {
    const decodedToken = await auth.verifyIdToken(token);

    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
      decodedToken.email,
    ]);
    const users = rows as User[];
    let user: User;

    if (users.length > 0) {
      user = users[0];
      if (!user.providers.includes("google")) {
        await pool.execute(
          `UPDATE users SET providers = JSON_ARRAY_APPEND(providers, '$', 'google'), updated_at = NOW() WHERE id = ?`,
          [user.id]
        );
      }

      // Update last_login timestamp
      await pool.execute(`UPDATE users SET last_login = NOW() WHERE id = ?`, [
        user.id,
      ]);
    } else {
      const connection = await pool.getConnection();
      const repository = new MySqlUidRepository(connection, "users");
      const uidGenerator = new UidGenerator(repository);
      await uidGenerator.initializeFromDatabase();
      const uid = await uidGenerator.generateSafe();
      const [_] = await pool.execute(
        `INSERT INTO users (id, email, name, photo_url, created_at, updated_at, last_login, role, active, providers) VALUES (?, ?, ?, ?, NOW(), NOW(), NOW(), 'user', true, JSON_ARRAY('google'))`,
        [
          uid,
          decodedToken.email,
          decodedToken.name || "",
          decodedToken.picture || "",
        ]
      );
      const [newRows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
        uid,
      ]);
      user = (newRows as User[])[0];
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photo_url,
      role: user.role,
      active: user.active,
      providers: user.providers || [],
    };

    const sessionToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const firebaseToken = await auth.createCustomToken(user.id);

    return { sessionToken, firebaseToken, user: this.sanitizeUser(user) };
  }
  async registerWithEmail({ email, password, name, photo_url }: RegisterUser) {
    if (!email || !password || !name) {
      throw new AuthError(
        "INVALID_CREDENTIALS",
        "Email, password, and name are required"
      );
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const users = rows as User[];
    if (users.length > 0) {
      throw new AuthError("USER_ALREADY_EXISTS", "User already exists");
    }
    const connection = await pool.getConnection();
    const repository = new MySqlUidRepository(connection, "users");
    const uidGenerator = new UidGenerator(repository);
    await uidGenerator.initializeFromDatabase();
    const uid = await uidGenerator.generateSafe();

    const passwordHash = await bcrypt.hash(password, 10);

    const [insertResult] = await pool.execute(
      `INSERT INTO users (id, email, name, password_hash, photo_url, created_at, updated_at, last_login, role, active, providers) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), NOW(), 'user', true, JSON_ARRAY('email'))`,
      [uid, email, name, passwordHash, photo_url || ""]
    );
    const [newRows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
      (insertResult as any).insertId,
    ]);
    const user = (newRows as User[])[0];

    return this.sanitizeUser(user);
  }
  async getUserById(id: string): Promise<Omit<User, "password_hash"> | null> {
    if (!id) {
      throw new AuthError("INVALID_ID", "User ID is required");
    }

    const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
    const users = rows as User[];

    if (users.length === 0) {
      return null;
    }

    return this.sanitizeUser(users[0]);
  }
}

export const authService = new AuthService();
