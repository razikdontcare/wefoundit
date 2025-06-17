import { DecodedIdToken } from "firebase-admin/auth";

export interface UserProfile {
  id?: number;
  uid: string;
  email: string;
  name?: string;
  avatar_url?: string;
  email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  last_login?: Date;
  is_admin?: boolean;
  is_active?: boolean;
  is_deleted?: boolean;
}

export interface RegistrationData {
  email: string;
  password: string;
  name?: string;
}

export interface UserProfileUpdate {
  name?: string;
  avatar_url?: string;
  email?: string;
}

export interface IAuthService {
  generateUid(): Promise<string>;
  isUidExist(uid: string): Promise<boolean>;
  registerUser(data: RegistrationData): Promise<UserProfile>;
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;
  getUserProfile(uid: string): Promise<UserProfile | null>;
  updateUserProfile(uid: string, data: UserProfileUpdate): Promise<UserProfile>;
  deleteUser(uid: string): Promise<void>;
  syncFirebaseUserToMySQL(uid: string): Promise<UserProfile | null>;
  signInWithGoogleToken(idToken: string): Promise<UserProfile>;
}
