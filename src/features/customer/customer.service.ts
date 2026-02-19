import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async create(data: CreateCustomerDto, userId: number) {
    const customer = this.repository.create({
      ...data,
      user: { id: userId },
    });
    return this.repository.save(customer);
  }

  async findAll(userId: number) {
    return this.repository.find({ where: { user: { id: userId } } });
  }
}
