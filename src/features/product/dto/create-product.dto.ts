import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
