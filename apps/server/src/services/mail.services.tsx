import type { IMailService } from "../interfaces/MailInterface.js";
import { env } from "../config.js";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import VerificationEmail from "../emails/Verification.js";

export class MailService implements IMailService {
  private transporter: ReturnType<typeof nodemailer.createTransport>;
  private from: string = env.SMTP_USER;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.from,
        to,
        subject,
        text,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string,
    user: string
  ): Promise<boolean> {
    const subject = "Email Verification";
    const html = await render(
      <VerificationEmail code={verificationCode} user={user} />
    );
    return this.sendEmail({ to, subject, html });
  }

  async sendPasswordResetEmail(
    to: string,
    resetToken: string
  ): Promise<boolean> {
    const subject = "Password Reset Request";
    const text = `Your password reset token is: ${resetToken}`;
    return this.sendEmail({ to, subject, text });
  }

  async sendWelcomeEmail(to: string): Promise<boolean> {
    const subject = "Welcome to Our Service";
    const html = `<p>Welcome to our service! We're glad to have you.</p>`;
    return this.sendEmail({ to, subject, html });
  }
}

export const mailService = new MailService();
