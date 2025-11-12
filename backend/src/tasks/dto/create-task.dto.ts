import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Estudar React' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Revisar hooks e context API', required: false })
  @IsOptional()
  description?: string;
}