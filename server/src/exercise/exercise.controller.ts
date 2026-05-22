import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CodeExecutionService } from './code-execution/code-execution.service';
import { InternalServerErrorException } from '@nestjs/common';

interface RunCodeDto {
  language: string;
  code: string;
  input: string;
  exerciseId: string;
}

@Controller('exercise')
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly codeExecutionService: CodeExecutionService,
  ) {}

  // Trong exercise.controller.ts
  @Post('run')
  async run(@Body() body: RunCodeDto) {
    // 1. Tìm exercise
    const exercise = await this.exerciseService.findById(body.exerciseId);
    if (!exercise) throw new InternalServerErrorException('Exercise not found');

    // 2. Chạy code
    const result = await this.codeExecutionService.runCode(
      body.language,
      body.code,
      body.input,
    );

    // 3. Xử lý Output: Loại bỏ tất cả khoảng trắng thừa
    const actualOutput = result.stdout
      ? result.stdout.trim().replace(/\s+/g, '')
      : '';

    // 4. Lấy Expected Output từ DB và cũng xử lý sạch
    const testCases = (exercise as any).testCases;
    const expectedOutput =
      testCases.length > 0
        ? testCases[0].expectedOutput.trim().replace(/\s+/g, '')
        : '';
console.log("DEBUG: Nội dung biến result là:", JSON.stringify(result));
    // 5. So sánh
    return {
      success: actualOutput === expectedOutput,
      actual: actualOutput,
      expected: expectedOutput,
    runtime: (result as any).executionTime ? `${(result as any).executionTime}ms` : '0ms',
  memory: (result as any).memoryUsed ? `${Math.round((result as any).memoryUsed / 1024)} MB` : '0 MB'
    };
  }

  @Get(':slug/:difficulty')
  findOne(
    @Param('slug') slug: string,
    @Param('difficulty') difficulty: string,
  ) {
    return this.exerciseService.findOne(slug, difficulty.toUpperCase());
  }

  @Get(':slug')
  findAll(@Param('slug') slug: string) {
    return this.exerciseService.findAll(slug);
  }

  @Get()
  async getAll() {
    return this.exerciseService.getAllExercises();
  }
}
