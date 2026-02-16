import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity';

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
}
