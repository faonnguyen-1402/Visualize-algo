import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('resend-otp')
  resendOtp(@Body() body: { email: string }) {
    return this.authService.resendOtp(body.email);
  }

  @Post('resend-link')
  resendVerifyLink(@Body() body: { email: string }) {
    return this.authService.resendVerifyLink(body.email);
  }

  @Get('verify-link')
  verifyEmailByLink(@Query('token') token: string) {
    return this.authService.verifyEmailByLink(token);
  }

  @Post('mark-verified')
  markVerified(@Body() body: { email: string }) {
    return this.authService.markVerified(body.email);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
