import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Đảm bảo bạn có file này
// import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });
  }

  // Cập nhật thông tin (cho EditProfileModal)
  async update(id: number, updateUserDto: UpdateUserDto) {
    delete updateUserDto.password;
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
