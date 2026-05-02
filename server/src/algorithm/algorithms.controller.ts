import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlgorithmsService } from './algorithms.service';
import { SimulateAlgorithmDto } from './dto/simulate-algorithm.dto';

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

  @Post(':slug/simulate')
  simulate(@Param('slug') slug: string, @Body() dto: SimulateAlgorithmDto) {
    const { array, target } = dto;

    if (slug.includes('search') && target === undefined) {
      return {
        message: 'Please provide the target number to run the simulation.',
        error: 'Bad Request',
        statusCode: 400,
      };
    }

    switch (slug) {
      case 'bubble-sort':
        return this.algorithmsService.simulateBubbleSort(array);
      case 'selection-sort':
        return this.algorithmsService.simulateSelectionSort(array);
      case 'insertion-sort':
        return this.algorithmsService.simulateInsertionSort(array);
      case 'quick-sort':
        return this.algorithmsService.simulateQuickSort(array);
      case 'linear-search':
        return this.algorithmsService.simulateLinearSearch(array, target!);
      case 'binary-search':
        return this.algorithmsService.simulateBinarySearch(array, target!);
    }
  }
}
