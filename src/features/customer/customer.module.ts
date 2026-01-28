import { Module } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CustomersController } from './customer.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
