import { RegisterUser, User } from "../types/UserType.js";

export interface IAuthService {
  loginWithGoogle(
    token: string
  ): Promise<{ sessionToken: string; firebaseToken: string; user: User }>;
  loginWithEmail(
    email: string,
    password: string
  ): Promise<{ sessionToken: string; firebaseToken: string; user: User }>;
  registerWithEmail({
    email,
    password,
    name,
    photo_url,
  }: RegisterUser): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  generateVerificationCode(email: string): Promise<string>;
  verifyEmail(
    email: string,
    verificationCode: string
  ): Promise<{ user: User; sessionToken: string }>;
  resetPassword(
    email: string,
    newPassword: string
  ): Promise<{ user: User; sessionToken: string }>;
  updateUser(
    userId: string,
    updates: Partial<Omit<User, "id" | "created_at" | "updated_at">>
  ): Promise<User>;
  deleteUser(userId: string): Promise<void>;
}
