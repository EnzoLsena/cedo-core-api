import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/features/abstract/base.entity'; 
@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: string;
}
