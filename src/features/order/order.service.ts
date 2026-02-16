import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { EOrderStatus } from 'src/common/enum/order-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from 'src/features/customer/entities/customer.entity';
import { Product } from 'src/features/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateOrderDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: data.customerId },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    let totalAmount = 0;

    const items = [];

    for (const item of data.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) throw new NotFoundException('Product not found');

      const totalPrice = Number(product.salePrice) * item.quantity;

      totalAmount += totalPrice;

      items.push({
        product,
        quantity: item.quantity,
        unitPrice: product.salePrice,
        totalPrice,
      });
    }

    const order = this.repository.create({
      customer,
      items,
      totalAmount,
    });

    return this.repository.save(order);
  }

  async finalize(orderId: number) {
    const order = await this.repository.findOne({
      where: { id: orderId },
    });

    if (!order) throw new NotFoundException();

    order.status = EOrderStatus.COMPLETED;

    return this.repository.save(order);
  }
}
