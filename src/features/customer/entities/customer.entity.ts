import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';
import { User } from 'src/features/user/entities/user.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.customers, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
