import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existedUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existedUser) {
      if (existedUser.isVerified) {
        throw new BadRequestException('Email is already verified');
      }

      await this.emailService.sendOtpEmail(existedUser.email);

      return {
        success: true,
        message: 'Account already exists. OTP has been resent to your email.',
        user: {
          id: existedUser.id,
          username: existedUser.username,
          email: existedUser.email,
          isVerified: existedUser.isVerified,
        },
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        isVerified: false,
      },
    });

    await this.emailService.sendOtpEmail(user.email);

    return {
      success: true,
      message: 'Register successful. OTP has been sent to your email.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    };
  }

  async verifyOtp(email: string, otpInput: string) {
    if (!email || !otpInput) {
      throw new BadRequestException('Email and OTP are required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const verifyResult = this.emailService.verifyOtp(email, otpInput);

    if (!verifyResult.success) {
      throw new BadRequestException('OTP verification failed or expired');
    }

    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    return {
      success: true,
      message: 'Email verified successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      },
    };
  }

  async verifyEmailByLink(token: string) {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    const verifyResult = this.emailService.verifyEmailByLink(token);

    if (!verifyResult.success || !verifyResult.email) {
      throw new BadRequestException('Verify link is invalid or expired');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: verifyResult.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const updatedUser = await this.prisma.user.update({
      where: { email: verifyResult.email },
      data: { isVerified: true },
    });

    return {
      success: true,
      message: 'Email verified successfully by link',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      },
    };
  }

  async resendOtp(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.emailService.sendOtpEmail(email);

    return {
      success: true,
      message: 'OTP resent successfully',
      email,
    };
  }

  async resendVerifyLink(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.emailService.sendVerifyLink(email);

    return {
      success: true,
      message: 'Verify link resent successfully',
      email,
    };
  }

  async markVerified(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    return {
      success: true,
      message: 'Email verified successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      },
    };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Wrong email or password');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    const payload = { sub: user.id, email: user.email };

    return {
      success: true,
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
