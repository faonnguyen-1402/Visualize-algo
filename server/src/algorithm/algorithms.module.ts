import { Module } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { AlgorithmsController } from './algorithms.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlgorithmsController],
  providers: [AlgorithmsService],
})
export class AlgorithmsModule {}
