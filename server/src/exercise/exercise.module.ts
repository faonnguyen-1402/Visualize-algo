import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CodeExecutionService } from './code-execution/code-execution.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, CodeExecutionService],
})
export class ExerciseModule {}
