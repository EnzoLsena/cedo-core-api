import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { OrderItem } from './order-item.entity';
import { Customer } from 'src/features/customer/entities/customer.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

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
