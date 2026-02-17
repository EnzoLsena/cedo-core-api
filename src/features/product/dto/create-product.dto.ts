import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(0)
  salePrice: number;

  @IsNumber()
  @Min(0)
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
