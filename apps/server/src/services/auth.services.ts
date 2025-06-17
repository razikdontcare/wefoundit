import {
  DecodedIdToken,
  Auth,
  UserRecord,
  CreateRequest,
  UpdateRequest,
} from "firebase-admin/auth";
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import {
  UserProfile,
  RegistrationData,
  UserProfileUpdate,
  IAuthService,
} from "../interfaces/auth.interface";
import {
  AuthError,
  DeletionError,
  RegistrationError,
  SyncError,
  UserProfileError,
  VerificationError,
} from "../types/AuthError";
import { PoolConnection } from "mysql2/promise";

export class AuthService implements IAuthService {
  private firebaseAuth: Auth;
  private dbPool: Pool;
  private readonly UID_PREFIX = "U";

  constructor(authInstance: Auth, poolInstance: Pool) {
    this.firebaseAuth = authInstance;
    this.dbPool = poolInstance;
  }

  async generateUid(): Promise<string> {
    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const year = String(currentDate.getFullYear()).slice(-2);

    const dateString = `${month}${day}${year}`;
    const sqlDate = `${currentDate.getFullYear()}-${month}-${day}`;

    let connection: PoolConnection | undefined;
    try {
      connection = await this.dbPool.getConnection();

      if (!connection) {
        throw new Error("Failed to get a database connection.");
      }

      await connection.beginTransaction();

      await connection.query(
        `INSERT INTO daily_user_sequences (generation_day, current_count)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE current_count = current_count + 1`,
        [sqlDate]
      );

      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT current_count FROM daily_user_sequences WHERE generation_day = ?`,
        [sqlDate]
      );

      await connection.commit();

      if (!rows || rows.length === 0 || rows[0].current_count === undefined) {
        throw new Error("Failed to retrieve the current count.");
      }

      const currentCount = rows[0].current_count as number;

      if (currentCount > 99999) {
        throw new Error("User ID generation limit exceeded for " + sqlDate);
      }

      const sequencePart = currentCount.toString().padStart(5, "0");
      const formattedUid = `${this.UID_PREFIX}${dateString}${sequencePart}`;

      return formattedUid;
    } catch (error: any) {
      if (connection) {
        await connection.rollback();
      }
      throw new AuthError(
        "uid-generation-failed",
        `Failed to generate UID: ${error.message}`
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async isUidExist(uid: string): Promise<boolean> {
    if (!uid || uid.length === 0 || uid.length > 128) {
      return true;
    }
    try {
      await this.firebaseAuth.getUser(uid);
      return true;
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        return false;
      }
      return true; // If there's any other error, assume UID exists
    }
  }

  async registerUser(data: RegistrationData): Promise<UserProfile> {
    const { email, password, name } = data;
    let uid: string = "";

    try {
      uid = await this.generateUid();
    } catch (error: any) {
      throw new RegistrationError(
        "uid-generation-failed",
        `Failed to generate UID: ${error.message}`
      );
    }

    if (!uid || uid.length === 0 || uid.length > 128) {
      throw new RegistrationError("invalid-uid", "Generated UID is invalid.");
    }

    if (!email || !password) {
      throw new RegistrationError(
        "missing-credentials",
        "Email and password are required."
      );
    }
    if (password.length < 6) {
      throw new RegistrationError(
        "weak-password",
        "Password must be at least 6 characters long."
      );
    }

    if (await this.isUidExist(uid)) {
      while (await this.isUidExist(uid)) {
        try {
          uid = await this.generateUid();
        } catch (error: any) {
          throw new RegistrationError(
            "uid-generation-failed",
            `Failed to generate UID: ${error.message}`
          );
        }
      }
    }

    let firebaseUser: UserRecord | null = null;
    let connection: PoolConnection | undefined;

    try {
      const createUserProps: CreateRequest = {
        uid,
        email,
        password,
        displayName: name,
        emailVerified: false,
      };

      firebaseUser = await this.firebaseAuth.createUser(createUserProps);
      connection = await this.dbPool.getConnection();
      await connection.beginTransaction();

      const userProfileData: Omit<UserProfile, "id"> = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "",
        avatar_url: firebaseUser.photoURL || "",
        email_verified: firebaseUser.emailVerified,
        is_admin: false,
        is_active: true,
        is_deleted: false,
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      };

      const [result] = await connection.query<ResultSetHeader>(
        "INSERT INTO users (uid, email, name, email_verified, avatar_url, created_at, updated_at, last_login, is_admin, is_active, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userProfileData.uid,
          userProfileData.email,
          userProfileData.name,
          userProfileData.email_verified,
          userProfileData.avatar_url,
          userProfileData.created_at,
          userProfileData.updated_at,
          userProfileData.last_login,
          userProfileData.is_admin,
          userProfileData.is_active,
          userProfileData.is_deleted,
        ]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        throw new RegistrationError(
          "db-insert-failed",
          "Failed to insert user profile into the database."
        );
      }

      const insertedId = result.insertId;
      await connection.commit();

      return {
        id: insertedId,
        ...userProfileData,
      };
    } catch (error: any) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rbError: any) {
          throw new RegistrationError(
            "transaction-rollback-failed",
            `Failed to rollback transaction: ${rbError.message}`
          );
        }
      }

      if (error.code === "auth/uid-already-exists") {
        throw new RegistrationError(
          "uid-already-exists",
          `UID ${uid} already exists.`
        );
      }

      if (firebaseUser && firebaseUser.uid) {
        try {
          await this.firebaseAuth.deleteUser(firebaseUser.uid);
        } catch (deleteError: any) {
          console.error(
            `CRITICAL: Failed to delete Firebase user ${firebaseUser.uid}: ${deleteError.message}. Manual cleanup may be required.`
          );
        }
      }

      throw new RegistrationError(
        "registration-failed",
        `Failed to register user: ${error.message}`
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    if (!idToken) {
      throw new VerificationError(
        "missing-id-token",
        "ID token is required for verification."
      );
    }

    try {
      const decodedToken: DecodedIdToken =
        await this.firebaseAuth.verifyIdToken(idToken, true);
      return decodedToken;
    } catch (error: any) {
      throw new VerificationError(
        "id-token-verification-failed",
        `Failed to verify ID token: ${error.message}`
      );
    }
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!uid) {
      throw new UserProfileError(
        "missing-uid",
        "User UID is required to fetch profile."
      );
    }

    try {
      const [rows] = await this.dbPool.query<RowDataPacket[]>(
        `SELECT id, uid, email, name, avatar_url, email_verified, created_at, updated_at, last_login, is_admin, is_active, is_deleted FROM users WHERE uid = ?`,
        [uid]
      );

      if (rows.length > 0) {
        return rows[0] as UserProfile;
      }
      return null; // User not found
    } catch (error: any) {
      throw new UserProfileError(
        "profile-fetch-failed",
        `Failed to fetch user profile: ${error.message}`
      );
    }
  }

  async updateUserProfile(
    uid: string,
    data: UserProfileUpdate
  ): Promise<UserProfile> {
    if (!uid) {
      throw new UserProfileError(
        "missing-uid",
        "User UID is required to update profile."
      );
    }

    if (Object.keys(data).length === 0) {
      const currentProfile = await this.getUserProfile(uid);
      if (!currentProfile) {
        throw new UserProfileError(
          "profile-not-found",
          "User profile not found."
        );
      }
      return currentProfile; // No updates needed, return current profile
    }

    const firebaseUpdates: UpdateRequest = {};
    const mysqlUpdateFields: string[] = [];
    const mysqlUpdateValues: any[] = [];

    if (data.name !== undefined) {
      firebaseUpdates.displayName = data.name;
      mysqlUpdateFields.push("name = ?");
      mysqlUpdateValues.push(data.name);
    }
    if (data.avatar_url !== undefined) {
      firebaseUpdates.photoURL = data.avatar_url;
      mysqlUpdateFields.push("avatar_url = ?");
      mysqlUpdateValues.push(data.avatar_url);
    }

    if (data.email !== undefined) {
      firebaseUpdates.email = data.email;
      mysqlUpdateFields.push("email = ?");
      mysqlUpdateValues.push(data.email);
      mysqlUpdateFields.push("email_verified = ?");
      mysqlUpdateValues.push(false); // Reset email verification status
    }

    let connection: PoolConnection | undefined;
    try {
      // Update di Firebase Auth
      if (Object.keys(firebaseUpdates).length > 0) {
        await this.firebaseAuth.updateUser(uid, firebaseUpdates);
      }
      // Update di MySQL
      if (mysqlUpdateFields.length > 0) {
        mysqlUpdateFields.push("updated_at = CURRENT_TIMESTAMP");
        mysqlUpdateValues.push(uid); // Add UID for WHERE clause

        const sql = `UPDATE users SET ${mysqlUpdateFields.join(
          ", "
        )} WHERE uid = ?`;

        connection = await this.dbPool.getConnection();
        await connection.beginTransaction();

        const [result] = await connection.query<ResultSetHeader>(
          sql,
          mysqlUpdateValues
        );
        await connection.commit();

        if (result.affectedRows === 0) {
        }
      }
      const updatedUserProfile = await this.getUserProfile(uid);
      if (!updatedUserProfile) {
        throw new UserProfileError(
          "profile-not-found",
          "User profile not found after update."
        );
      }

      return updatedUserProfile;
    } catch (error: any) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rbError: any) {
          throw new UserProfileError(
            "transaction-rollback-failed",
            `Failed to rollback transaction: ${rbError.message}`
          );
        }
      }
      if (error.code === "auth/user-not-found") {
        throw new UserProfileError(
          "user-not-found",
          `User with UID ${uid} not found in Firebase.`
        );
      }
      if (error.code === "auth/email-already-exists") {
        throw new UserProfileError(
          "email-already-exists",
          `Email ${data.email} is already in use.`
        );
      }
      throw new UserProfileError(
        "profile-update-failed",
        `Failed to update user profile: ${error.message}`
      );
    } finally {
      if (connection) connection.release();
    }
  }

  async syncFirebaseUserToMySQL(uid: string): Promise<UserProfile | null> {
    if (!uid) {
      throw new SyncError(
        "missing-uid",
        "User UID is required to sync profile."
      );
    }

    let firebaseUser: UserRecord;

    try {
      firebaseUser = await this.firebaseAuth.getUser(uid);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        return null; // User not found in Firebase
      }
      throw new SyncError(
        "firebase-user-fetch-failed",
        `Failed to fetch Firebase user: ${error.message}`
      );
    }

    const dataToSync: Partial<
      Omit<
        UserProfile,
        | "id"
        | "created_at"
        | "updated_at"
        | "last_login"
        | "is_admin"
        | "is_active"
        | "is_deleted"
      >
    > & { uid: string } = { uid: firebaseUser.uid };

    if (firebaseUser.displayName !== undefined)
      dataToSync.name = firebaseUser.displayName;
    if (firebaseUser.email !== undefined) dataToSync.email = firebaseUser.email;
    if (firebaseUser.emailVerified !== undefined)
      dataToSync.email_verified = firebaseUser.emailVerified;
    if (firebaseUser.photoURL !== undefined)
      dataToSync.avatar_url = firebaseUser.photoURL;

    const fields: string[] = [];
    const values: any[] = [];

    (Object.keys(dataToSync) as Array<keyof typeof dataToSync>).forEach(
      (key) => {
        if (dataToSync[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(dataToSync[key]);
        }
      }
    );

    if (fields.length === 0) {
      return (await this.getUserProfile(uid)) as UserProfile;
    }

    values.push(uid);

    const sql = `UPDATE users SET ${fields.join(
      ", "
    )}, updated_at = CURRENT_TIMESTAMP WHERE uid = ?`;

    let connection: PoolConnection | undefined;
    try {
      connection = await this.dbPool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query<ResultSetHeader>(sql, values);
      await connection.commit();

      if (result.affectedRows === 0) {
      } else {
        // jika user tidak ada di MySQL, insert data baru
        const existingProfile = await this.getUserProfile(uid);
        if (!existingProfile) {
          const now = new Date();
          const newUserProfileData: Omit<UserProfile, "id"> = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "unknown@example.com", // Fallback jika email null
            name: firebaseUser.displayName || undefined,
            avatar_url: firebaseUser.photoURL || undefined,
            email_verified: firebaseUser.emailVerified || false,
            created_at: firebaseUser.metadata.creationTime
              ? new Date(firebaseUser.metadata.creationTime)
              : now,
            updated_at: now,
            last_login: firebaseUser.metadata.lastSignInTime
              ? new Date(firebaseUser.metadata.lastSignInTime)
              : now,
            is_admin: false,
            is_active: !firebaseUser.disabled,
            is_deleted: false,
          };
          await connection.query<ResultSetHeader>(
            "INSERT INTO users (uid, email, name, avatar_url, email_verified, created_at, updated_at, last_login, is_admin, is_active, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
              newUserProfileData.uid,
              newUserProfileData.email,
              newUserProfileData.name,
              newUserProfileData.avatar_url,
              newUserProfileData.email_verified,
              newUserProfileData.created_at,
              newUserProfileData.updated_at,
              newUserProfileData.last_login,
              newUserProfileData.is_admin,
              newUserProfileData.is_active,
              newUserProfileData.is_deleted,
            ]
          );
        }
      }
      return (await this.getUserProfile(uid)) as UserProfile;
    } catch (error: any) {
      throw new SyncError(
        "profile-sync-failed",
        `Failed to sync user profile: ${error.message}`
      );
    }
  }

  async deleteUser(uid: string): Promise<void> {
    if (!uid) {
      throw new DeletionError(
        "missing-uid",
        "User UID is required to delete profile."
      );
    }

    let mysqlDeleted = false;
    let connection: PoolConnection | undefined;
    try {
      connection = await this.dbPool.getConnection();
      await connection.beginTransaction();
      const [result] = await connection.query<ResultSetHeader>(
        `UPDATE users SET is_deleted = true, is_active = false, updated_at = CURRENT_TIMESTAMP WHERE uid = ?`,
        [uid]
      );

      if (result.affectedRows > 0) {
        mysqlDeleted = true;
      } else {
        throw new DeletionError(
          "user-not-found",
          `User with UID ${uid} not found in MySQL database.`
        );
      }

      await connection.commit();

      await this.firebaseAuth.deleteUser(uid);
    } catch (error: any) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rbError: any) {
          throw new DeletionError(
            "transaction-rollback-failed",
            `Failed to rollback transaction: ${rbError.message}`
          );
        }
      }

      throw new DeletionError(
        "user-deletion-failed",
        `Failed to delete user: ${error.message}`
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async signInWithGoogleToken(idToken: string): Promise<UserProfile> {
    if (!idToken) {
      throw new VerificationError(
        "missing-id-token",
        "ID token is required for Google sign-in."
      );
    }

    let decodedToken: DecodedIdToken;

    try {
      decodedToken = await this.firebaseAuth.verifyIdToken(idToken, true);
    } catch (error: any) {
      throw new VerificationError(
        "google-signin-verification-failed",
        `Failed to verify Google ID token: ${error.message}`
      );
    }

    const uid = decodedToken.uid;
    const emailFromToken = decodedToken.email;
    const nameFromToken = decodedToken.name || null;
    const avatarUrlFromToken = decodedToken.picture || undefined;
    const emailVerifiedFromToken = decodedToken.email_verified || false;

    if (!emailFromToken) {
      throw new VerificationError(
        "missing-email",
        "Email is required for Google sign-in."
      );
    }

    let connection: PoolConnection | undefined;

    try {
      connection = await this.dbPool.getConnection();
      await connection.beginTransaction();

      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT id, uid, email, name, avatar_url, email_verified, created_at, updated_at, last_login, is_admin, is_active, is_deleted FROM users WHERE uid = ?`,
        [uid]
      );

      let userProfile: UserProfile | null = null;
      const now = new Date();

      if (rows.length > 0) {
        const existingProfile = rows[0] as UserProfile;

        const updates: Partial<
          Omit<UserProfile, "id" | "uid" | "created_at" | "updated_at">
        > = { last_login: now };

        if (nameFromToken !== existingProfile.name)
          updates.name = nameFromToken;
        if (avatarUrlFromToken !== existingProfile.avatar_url)
          updates.avatar_url = avatarUrlFromToken;
        if (emailVerifiedFromToken !== existingProfile.email_verified)
          updates.email_verified = emailVerifiedFromToken;
        if (emailFromToken !== existingProfile.email)
          updates.email = emailFromToken;
        updates.is_active = true; // Pastikan user aktif saat login
        updates.is_deleted = false; // Pastikan user tidak ditandai deleted saat login

        const updateFields = Object.keys(updates)
          .map((key) => `${key} = ?`)
          .join(", ");
        const updateValues = [...Object.values(updates), now, uid]; // updated_at = now, WHERE uid = ?

        await connection.query<ResultSetHeader>(
          `UPDATE users SET ${updateFields}, updated_at = ? WHERE uid = ?`,
          updateValues
        );

        const [updatedRows] = await connection.query<RowDataPacket[]>(
          "SELECT * FROM users WHERE uid = ?",
          [uid]
        );
        userProfile = updatedRows[0] as UserProfile;
      } else {
        const newUserProfileData: Omit<UserProfile, "id"> = {
          uid: uid,
          email: emailFromToken,
          name: nameFromToken,
          avatar_url: avatarUrlFromToken,
          email_verified: emailVerifiedFromToken,
          created_at: now,
          updated_at: now,
          last_login: now,
          is_admin: false,
          is_active: true,
          is_deleted: false,
        };

        const [result] = await connection.query<ResultSetHeader>(
          "INSERT INTO users (uid, email, name, avatar_url, email_verified, created_at, updated_at, last_login, is_admin, is_active, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            newUserProfileData.uid,
            newUserProfileData.email,
            newUserProfileData.name,
            newUserProfileData.avatar_url,
            newUserProfileData.email_verified,
            newUserProfileData.created_at,
            newUserProfileData.updated_at,
            newUserProfileData.last_login,
            newUserProfileData.is_admin,
            newUserProfileData.is_active,
            newUserProfileData.is_deleted,
          ]
        );

        userProfile = { id: result.insertId, ...newUserProfileData };
      }

      await connection.commit();
      return userProfile;
    } catch (error: any) {
      if (connection) {
        try {
          await connection.rollback();
        } catch (rbError: any) {
          throw new VerificationError(
            "transaction-rollback-failed",
            `Failed to rollback transaction: ${rbError.message}`
          );
        }
      }

      throw new VerificationError(
        "google-signin-failed",
        `Failed to sign in with Google token: ${error.message}`
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
