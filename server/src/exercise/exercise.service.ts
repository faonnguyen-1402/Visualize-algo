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

  async getAllExercises() {
    console.log('Đang lấy toàn bộ danh sách bài tập cho trang Practice...');

    const exercises = await this.prisma.exercise.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        algorithm: {
          select: {
            id: true,
            name: true,
            slug: true,
            category: {
              select: {
                id: true,
                name: true,
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

  // Trong exercise.service.ts
  async getCompletedCount(userId: number): Promise<number> {
    // Tìm tất cả các bài tập mà user đã có submission thành công
    const completedSubmissions = await this.prisma.submission.findMany({
      where: {
        userId: userId,
        status: 'ACCEPTED',
      },
      select: {
        exerciseId: true, // Chỉ cần lấy ID để đếm
      },
      distinct: ['exerciseId'], // Đảm bảo đếm mỗi bài 1 lần duy nhất
    });

    return completedSubmissions.length;
  }

  async findOneById(id: string) {
    const numericId = parseInt(id, 10);

    return await this.prisma.exercise.findUnique({
      where: { id: numericId },
      include: { testCases: true },
    });
  }

  async getTotalExercisesCount(): Promise<number> {
    return await this.prisma.exercise.count();
  }

  async saveSubmission(
    userId: number,
    exerciseId: number,
    code: string,
    runtime: number,
    memory: number,
  ) {
    return await this.prisma.submission.create({
      data: {
        userId,
        exerciseId,
        status: 'ACCEPTED', // Hoặc giá trị mặc định của bạn
        code: code,
        executionTime: runtime, // Khớp với trường 'executionTime' trong schema
        memory: memory, // KHỚP VỚI TRƯỜNG 'memory' TRONG SCHEMA (Thay vì 'memoryUsed')
      },
    });
  }

  async getCompletedList(userId: number) {
    return await this.prisma.submission.findMany({
      where: {
        userId: userId,
        status: 'ACCEPTED',
      },
      include: {
        exercise: true, // Lấy toàn bộ thông tin bài tập (trong đó có difficulty)
      },
      distinct: ['exerciseId'], // Chỉ lấy 1 lần cho mỗi bài tập
    });
  }
}
