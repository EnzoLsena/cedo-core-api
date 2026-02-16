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

  async create(data: CreateCustomerDto) {
    const customer = this.repository.create(data);
    return this.repository.save(customer);
  }

  async findAll() {
    return this.repository.find();
  }
}
