import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto, @CurrentUser() user: JwtPayload) {
    return this.customersService.create(createCustomerDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.customersService.findAll(user.id);
  }
}
