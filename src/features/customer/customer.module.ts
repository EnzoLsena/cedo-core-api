import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomersController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomerService],
})
export class CustomersModule {}
