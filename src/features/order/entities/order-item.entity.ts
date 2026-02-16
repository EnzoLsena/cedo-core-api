import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Order } from './order.entity';
import { Product } from 'src/features/product/entities/product.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, order => order.items, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column('decimal')
  quantity: number;

  @Column('decimal')
  unitPrice: number;

  @Column('decimal')
  totalPrice: number;
}
