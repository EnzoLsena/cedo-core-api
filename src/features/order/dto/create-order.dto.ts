import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
