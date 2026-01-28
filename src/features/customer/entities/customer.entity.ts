import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
import { Order } from 'src/features/order/entities/order.entity'; 
@Entity('customers')
export class Customer extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  notes: string;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}
