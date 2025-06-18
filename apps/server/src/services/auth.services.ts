import { IAuthService } from "../interfaces/AuthInterface";
import { auth } from "../lib/firebase";
import pool from "../lib/mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { RegisterUser, User } from "../types/UserType";
import { AuthError } from "../interfaces/AuthError";
import { env } from "../config";

class AuthService implements IAuthService {
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
      user.passwordHash || ""
    );

    if (!isPasswordValid) {
      throw new AuthError("INVALID_PASSWORD", "Invalid password");
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
      role: user.role,
      active: user.active,
      providers: user.providers || [],
    };

    const sessionToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const firebaseToken = await auth.createCustomToken(user.id);

    return { sessionToken, firebaseToken, user };
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
          `UPDATE users SET providers = JSON_ARRAY_APPEND(providers, '$', 'google') WHERE id = ?`,
          [user.id]
        );
      }
    } else {
      const [insertResult] = await pool.execute(
        `INSERT INTO users (id, email, name, photoURL, createdAt, updatedAt, role, active, providers) VALUES (?, ?, ?, ?, NOW(), NOW(), 'user', true, JSON_ARRAY('google'))`,
        [
          decodedToken.uid,
          decodedToken.email,
          decodedToken.name || "",
          decodedToken.picture || "",
        ]
      );
      const [newRows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
        (insertResult as any).insertId,
      ]);
      user = (newRows as User[])[0];
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      photoURL: user.photoURL,
      role: user.role,
      active: user.active,
      providers: user.providers || [],
    };

    const sessionToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: "30m",
    });

    const firebaseToken = await auth.createCustomToken(user.id);

    return { sessionToken, firebaseToken, user };
  }
  async registerWithEmail({ email, password, name, photoURL }: RegisterUser) {
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

    const passwordHash = await bcrypt.hash(password, 10);

    const [insertResult] = await pool.execute(
      `INSERT INTO users (email, name, passwordHash, photoURL, createdAt, updatedAt, role, active, providers) VALUES (?, ?, ?, ?, NOW(), NOW(), 'user', true, JSON_ARRAY('email'))`,
      [email, name, passwordHash, photoURL || ""]
    );
    const [newRows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [
      (insertResult as any).insertId,
    ]);
    const user = (newRows as User[])[0];

    return user;
  }
  async getUserById(id: string): Promise<User | null> {
    if (!id) {
      throw new AuthError("INVALID_ID", "User ID is required");
    }

    const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
    const users = rows as User[];

    if (users.length === 0) {
      return null;
    }

    return users[0];
  }
}

export const authService = new AuthService();
