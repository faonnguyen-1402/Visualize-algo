import { ArrayMaxSize, IsArray, IsNumber, IsOptional } from 'class-validator';

export class SimulateAlgorithmDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMaxSize(20)
  array!: number[];

  @IsOptional()
  @IsNumber()
  target?: number;
}
