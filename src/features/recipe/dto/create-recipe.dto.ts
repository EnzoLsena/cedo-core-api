import {
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RecipeItemDto {
  @IsString()
  ingredientName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitCost: number;
}

export class CreateRecipeDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  laborCost: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeItemDto)
  items: RecipeItemDto[];
}
