import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: JwtPayload) {
    return this.orderService.create(createOrderDto, user.id);
  }

  @Post(':id/finalize')
  finalize(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.orderService.finalize(+id, user.id);
  }
}
