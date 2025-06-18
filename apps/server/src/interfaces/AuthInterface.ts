import { RegisterUser, User } from "../types/UserType";

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
    photoURL,
  }: RegisterUser): Promise<User>;
  getUserById(id: string): Promise<User | null>;
}

export class AuthError extends Error {
  public code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}
