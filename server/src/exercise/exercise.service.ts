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
    const correctExerciseSlug = `${slug}-${difficultyStr.toLowerCase()}`;
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        slug: correctExerciseSlug,
        // difficulty: difficulty,
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
      throw new NotFoundException(
        `There is no exercise in ${correctExerciseSlug}`,
      );
    }
    if (exercise.difficulty !== difficulty) {
      throw new NotFoundException(`Exercise difficulty mismatch`);
    }
    return exercise;
  }

  // server/src/exercise/exercise.service.ts

  async getAllExercises() {
    console.log('Đang lấy toàn bộ danh sách bài tập cho trang Practice...');

    const exercises = await this.prisma.exercise.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        // 🔥 Bắt buộc select thêm cái này để Frontend có tên thuật toán chạy bộ lọc
        algorithm: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: {
              select: {
                id: true,
                name: true, // Nơi chứa chữ "Sorting" hoặc "Searching"
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return exercises;
  }
}
