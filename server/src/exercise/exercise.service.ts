import { Injectable, NotFoundException } from '@nestjs/common';
import { Difficulty } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async findAll(slug: string) {
    console.log('Đang tìm bài tập cho thuật toán có slug:', slug);
    const exercise = await this.prisma.exercise.findMany({
      where: {
        algorithm: { slug: slug },
      },
      select: {
        id: true,
        title: true,
        difficulty: true,
        slug: true,
      },
      orderBy: { difficulty: 'asc' },
    });
    if (exercise.length === 0) {
      throw new NotFoundException(`Can not found exercise for: ${slug}`);
    }
    return exercise;
  }

  async findOne(slug: string, difficultyStr: string) {
    const difficulty = difficultyStr.toUpperCase() as Difficulty;
    const exercise = await this.prisma.exercise.findFirst({
      where: {
        algorithm: { slug: slug },
        difficulty: difficulty,
      },
      include: {
        testCases: {
          where: { isSample: true },
          select: {
            input: true,
            expectedOutput: true,
          },
        },
        algorithm: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
    if (!exercise) {
      throw new NotFoundException(`There is no exercise in ${slug}`);
    }
    return exercise;
  }
}
