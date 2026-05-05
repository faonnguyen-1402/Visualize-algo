import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class SimulateAlgorithmDto {
  @IsArray()
  @IsNumber({}, { each: true })
  array: number[];

  @IsOptional()
  @IsNumber()
  target?: number;
}
