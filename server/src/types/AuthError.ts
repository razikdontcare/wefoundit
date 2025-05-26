export class AuthError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "AuthError";
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class RegistrationError extends AuthError {}
export class VerificationError extends AuthError {}
export class UserProfileError extends AuthError {}
export class DeletionError extends AuthError {}
export class SyncError extends AuthError {}
