import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  // OTP
  @Post()
  create(@Body() payload: { email: string }) {
    console.log(payload, 'email');
    return this.emailService.sendOtpEmail(payload.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.emailService.verifyOtp(body.email, body.otp);
  }
  @Post('resend-otp')
  resendOtp(@Body() body: { email: string }) {
    return this.emailService.resendOtp(body.email);
  }

  // LINK
  @Post('verify-link')
  verifyLink(@Body() body: { token: string }) {
    return this.emailService.verifyEmailByLink(body.token);
  }
  @Post('send-link')
  sendLink(@Body() body: { email: string }) {
    return this.emailService.sendVerifyLink(body.email);
  }
  @Post('resend-link')
  resendLink(@Body() body: { email: string }) {
    return this.emailService.resendOtp(body.email);
  }
}
