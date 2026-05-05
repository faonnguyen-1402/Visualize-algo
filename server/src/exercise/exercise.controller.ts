import { Controller, Get, Body, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get(':slug/:difficulty')
  findOne(
    @Param('slug') slug: string,
    @Param('difficulty') difficulty: string,
  ) {
    return this.exerciseService.findOne(slug, difficulty);
  }

  @Get(':slug')
  findAll(@Param('slug') slug: string) {
    return this.exerciseService.findAll(slug);
  }
}
