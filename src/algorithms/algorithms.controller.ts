import { Controller, Get, Param } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';

@Controller('algorithms')
export class AlgorithmsController {
  constructor(private algorithmsService: AlgorithmsService) {}

  @Get()
  findAll() {
    return this.algorithmsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.algorithmsService.findOne(slug);
  }
}
