import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlgorithmsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.algorithm.findMany({
      include: {
        category: true,
        exercises: true,
      },
    });
  }

  findOne(slug: string) {
    return this.prisma.algorithm.findUnique({
      where: { slug },
      include: {
        category: true,
        exercises: true,
      },
    });
  }
}
