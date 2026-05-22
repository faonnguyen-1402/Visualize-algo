import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// Định nghĩa cấu trúc của Request sau khi qua Guard
interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // Sử dụng kiểu dữ liệu đã định nghĩa
  getProfile(@Request() req: AuthenticatedRequest) {
    // Bây giờ TypeScript hiểu rõ req.user.id là số
    return this.usersService.findOne(req.user.id);
  }
}
