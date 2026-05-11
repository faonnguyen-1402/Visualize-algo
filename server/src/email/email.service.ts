import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly otps = new Map<string, { otp: string; exp: number }>();
  private readonly verifyLinks = new Map<
    string,
    { email: string; exp: number }
  >();

  private get expiredMs(): number {
    const value = Number(process.env.OTP_EXPIRED_MS);
    return Number.isFinite(value) && value > 0 ? value : 3 * 60 * 1000;
  }

  private getOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getVerifyToken(): string {
    return randomUUID();
  }

  private getEnv() {
    const host = process.env.MAILTRAP_HOST;
    const portRaw = process.env.MAILTRAP_PORT;
    const user = process.env.MAILTRAP_USER;
    const pass = process.env.MAILTRAP_PASS;

    const fromName = process.env.MAIL_FROM_NAME || 'Bot App';
    const fromEmail = process.env.MAIL_FROM_EMAIL;
    const appBaseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';

    const port = portRaw ? Number(portRaw) : 2525;

    if (!host) {
      throw new BadRequestException('MAILTRAP_HOST is missing');
    }

    if (!portRaw || Number.isNaN(port)) {
      throw new BadRequestException('MAILTRAP_PORT is missing or invalid');
    }

    if (!user) {
      throw new BadRequestException('MAILTRAP_USER is missing');
    }

    if (!pass) {
      throw new BadRequestException('MAILTRAP_PASS is missing');
    }

    if (!fromEmail) {
      throw new BadRequestException('MAIL_FROM_EMAIL is missing');
    }

    return {
      host,
      port,
      user,
      pass,
      fromName,
      fromEmail,
      appBaseUrl,
    };
  }

  private createTransporter() {
    const { host, port, user, pass } = this.getEnv();

    return nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendOtpEmail(email: string) {
    try {
      const transporter = this.createTransporter();
      const { fromName, fromEmail } = this.getEnv();

      const otp = this.getOtp();

      this.otps.set(email, {
        otp,
        exp: Date.now() + this.expiredMs,
      });

      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: '[SANDBOX] Verify OTP',
        text: `Your OTP is: ${otp}. This OTP will expire in ${Math.floor(this.expiredMs / 60000)} minutes.`,
      });

      return {
        success: true,
        message: `Send OTP success to ${email}`,
        email,
      };
    } catch (error) {
      console.error('send otp error', error);
      throw new InternalServerErrorException('Send OTP failed');
    }
  }

  verifyOtp(email: string, otpInput: string) {
    const otpRecord = this.otps.get(email);

    if (!otpRecord) {
      throw new BadRequestException("OTP doesn't exist");
    }

    if (Date.now() > otpRecord.exp) {
      this.otps.delete(email);
      throw new BadRequestException('OTP has expired');
    }

    if (otpRecord.otp !== otpInput) {
      throw new BadRequestException('OTP is incorrect');
    }

    this.otps.delete(email);

    return {
      success: true,
      message: 'Verify OTP success',
      email,
    };
  }

  async sendVerifyLink(email: string) {
    try {
      const transporter = this.createTransporter();
      const { fromName, fromEmail, appBaseUrl } = this.getEnv();

      const token = this.getVerifyToken();
      const exp = Date.now() + this.expiredMs;

      this.verifyLinks.set(token, {
        email,
        exp,
      });

      const verifyLink = `${appBaseUrl}/verify-email-link?token=${token}`;

      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: '[SANDBOX] Verify email by link',
        text: `Click this link to verify your email: ${verifyLink}`,
      });

      return {
        success: true,
        message: `Send verify link success to ${email}`,
        email,
      };
    } catch (error) {
      console.error('send verify link error', error);
      throw new InternalServerErrorException('Send verify link failed');
    }
  }

  verifyEmailByLink(token: string) {
    const record = this.verifyLinks.get(token);

    if (!record) {
      throw new BadRequestException('Verify link is invalid or does not exist');
    }

    if (Date.now() > record.exp) {
      this.verifyLinks.delete(token);
      throw new BadRequestException('Verify link has expired');
    }

    this.verifyLinks.delete(token);

    return {
      success: true,
      message: 'Verify email by link success',
      email: record.email,
    };
  }

  async resendOtp(email: string) {
    return this.sendOtpEmail(email);
  }

  async resendVerifyLink(email: string) {
    return this.sendVerifyLink(email);
  }
}
