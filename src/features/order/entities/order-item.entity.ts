import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column('decimal')
  unitPrice: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  totalPrice: number;
}
