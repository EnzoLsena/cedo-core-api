import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
