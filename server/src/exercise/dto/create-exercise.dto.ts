import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// 1. Khai báo Class con trước
export class TestCaseDto {
  @IsString()
  @IsNotEmpty()
  input!: string;

  @IsString()
  @IsNotEmpty()
  output!: string;
}

// 2. Khai báo Class cha sau
export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  difficulty!: 'Dễ' | 'Trung bình' | 'Khó';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto) // Bây giờ TestCaseDto đã được định nghĩa bên trên, không còn "unresolved" nữa
  testCases!: TestCaseDto[];

  @IsNumber()
  executionTime!: number;

  @IsNumber()
  memoryUsed!: number;
}
