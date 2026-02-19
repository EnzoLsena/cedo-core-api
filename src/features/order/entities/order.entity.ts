import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { Customer } from 'src/features/customer/entities/customer.entity';
import { OrderItem } from './order-item.entity';
import { EOrderStatus } from 'src/common/enum/order-status.enum';
import { User } from 'src/features/user/entities/user.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @ManyToOne(() => User, user => user.orders, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column({
    type: 'enum',
    enum: EOrderStatus,
    default: EOrderStatus.OPEN,
  })
  status: EOrderStatus;

  @Column('decimal', { default: 0 })
  totalAmount: number;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];
}
