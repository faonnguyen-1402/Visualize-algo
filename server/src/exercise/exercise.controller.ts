import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CodeExecutionService } from './code-execution/code-execution.service';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface RunCodeDto {
  language: string;
  code: string;
  input: string;
  exerciseId: string;
}
interface UserRequest {
  user: { id: number };
}

interface Exercise {
  id: number;
  testCases: { expectedOutput: string }[];
}

interface ExecutionResult {
  stdout: string;
  executionTime?: number;
  memoryUsed?: number;
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
    const exercise = await this.exerciseService.findOneById(body.exerciseId);
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
    console.log('DEBUG: Nội dung biến result là:', JSON.stringify(result));
    // 5. So sánh
    return {
      success: actualOutput === expectedOutput,
      actual: actualOutput,
      expected: expectedOutput,
      runtime: (result as any).executionTime
        ? `${(result as any).executionTime}ms`
        : '0ms',
      memory: (result as any).memoryUsed
        ? `${Math.round((result as any).memoryUsed / 1024)} MB`
        : '0 MB',
    };
  }

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  async submitExercise(
    @Req() req,
    @Body() body: { exerciseId: number; code: string },
  ) {
    const userId = req.user.id;
    // Truyền đủ 3 tham số: userId, exerciseId, và code
    return await this.exerciseService.saveSubmission(
      userId,
      body.exerciseId,
      body.code || '',
      0,
      0,
    );
  }

  @Get('count')
  async getCount() {
    return await this.exerciseService.getTotalExercisesCount();
  }

  @Get()
  async getAll() {
    return this.exerciseService.getAllExercises();
  }

  @Get(':slug/:difficulty')
  findExerciseBySlugAndDifficulty(
    @Param('slug') slug: string,
    @Param('difficulty') difficulty: string,
  ) {
    return this.exerciseService.findOne(slug, difficulty.toUpperCase());
  }

  @Get(':slug')
  findAll(@Param('slug') slug: string) {
    return this.exerciseService.findAll(slug);
  }

  @Get(':id')
  async findExerciseById(@Param('id') id: string) {
    return await this.exerciseService.findOneById(id);
  }

  // Trong exercise.controller.ts
  @Get('user/:userId/completed-count')
  async getCompletedCount(@Param('userId') userId: string) {
    return await this.exerciseService.getCompletedCount(parseInt(userId));
  }

  @Get('user/:userId/completed-list')
  @UseGuards(JwtAuthGuard)
  async getCompletedList(@Param('userId') userId: string) {
    return await this.exerciseService.getCompletedList(Number(userId));
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExerciseDto: UpdateExerciseDto,
  // ) {
  //   return this.exerciseService.update(+id, updateExerciseDto);
  // }
}
