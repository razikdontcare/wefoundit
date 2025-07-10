export interface IMailService {
  sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<boolean>;
  sendVerificationEmail(
    to: string,
    verificationCode: string,
    user: string
  ): Promise<boolean>;
  sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean>;
  sendWelcomeEmail(to: string): Promise<boolean>;
}
