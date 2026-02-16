import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PageParams {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @ApiProperty({ default: 15 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 15;

  constructor(partial?: Partial<PageParams>) {
    Object.assign(this, partial);
  }
}
