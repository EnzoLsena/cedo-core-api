import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column()
  customerId: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  scheduledFor: Date;

  @Column('decimal')
  totalAmount: number;

  @OneToMany(() => OrderItem, item => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];
}
